begin;

  do language plpgsql $$
    declare
      role_exists boolean;
    begin
      select true into role_exists from pg_roles where rolname='app_graphile';

      if role_exists is null then
        create role app_graphile;
	execute format('grant app_graphile to %I',current_user);
        execute format('grant connect on database %I to app_graphile',current_database());
      end if;

      select true into role_exists from pg_roles where rolname='app_anonymous';
      if role_exists is null then
        create role app_anonymous;
        grant app_anonymous to app_graphile;
      end if;


      select true into role_exists from pg_roles where rolname='app_user';
      if role_exists is null then
        create role app_user;
        grant app_user to app_graphile;
      end if;

      select true into role_exists from pg_roles where rolname='app_meal_designer';
      if role_exists is null then
        create role app_meal_designer;
        grant app_meal_designer to app_graphile;
      end if;

      select true into role_exists from pg_roles where rolname='app_admin';
      if role_exists is null then
        create role app_admin;
        grant app_admin to app_graphile;
      end if;
    end;
  $$;


  create extension if not exists pgcrypto;
  create schema if not exists app;
  create schema if not exists app_private;

  -- after schema creation and before function creation
  alter default privileges revoke execute on functions from public;

  create or replace function app.set_updated_at() returns trigger as $$
  begin
    new.updated_at := current_timestamp;
    new.created_at := old.created_at;
    return new;
  end;
  $$ language plpgsql;

  create or replace function app.set_created_at() returns trigger as $$
  begin
    new.created_at := current_timestamp;
    new.updated_at := new.created_at;
    return new;
  end;
  $$ language plpgsql;

  
  -- nanoid imports from https://github.com/viascom/nanoid-postgresql
  -- Apache 2.0 license ©️  Viascom
  CREATE OR REPLACE FUNCTION nanoid(
      size int DEFAULT 21, -- The number of symbols in the NanoId String. Must be greater than 0.
      alphabet text DEFAULT '_-0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', -- The symbols used in the NanoId String. Must contain between 1 and 255 symbols.
      additionalBytesFactor float DEFAULT 1.6 -- The additional bytes factor used for calculating the step size. Must be equal or greater then 1.
  )
      RETURNS text -- A randomly generated NanoId String
      LANGUAGE plpgsql
      VOLATILE
      LEAKPROOF
      PARALLEL SAFE
  AS
  $$
  DECLARE
      alphabetArray  text[];
      alphabetLength int := 64;
      mask           int := 63;
      step           int := 34;
  BEGIN
      IF size IS NULL OR size < 1 THEN
          RAISE EXCEPTION 'The size must be defined and greater than 0!';
      END IF;

      IF alphabet IS NULL OR length(alphabet) = 0 OR length(alphabet) > 255 THEN
          RAISE EXCEPTION 'The alphabet can''t be undefined, zero or bigger than 255 symbols!';
      END IF;

      IF additionalBytesFactor IS NULL OR additionalBytesFactor < 1 THEN
          RAISE EXCEPTION 'The additional bytes factor can''t be less than 1!';
      END IF;

      alphabetArray := regexp_split_to_array(alphabet, '');
      alphabetLength := array_length(alphabetArray, 1);
      mask := (2 << cast(floor(log(alphabetLength - 1) / log(2)) as int)) - 1;
      step := cast(ceil(additionalBytesFactor * mask * size / alphabetLength) AS int);

      IF step > 1024 THEN
          step := 1024; -- The step size % can''t be bigger then 1024!
      END IF;

      RETURN nanoid_optimized(size, alphabet, mask, step);
  END
  $$;

  -- Generates an optimized random string of a specified size using the given alphabet, mask, and step.
  -- This optimized version is designed for higher performance and lower memory overhead.
  -- No checks are performed! Use it only if you really know what you are doing.
  DROP FUNCTION IF EXISTS nanoid_optimized(int, text, int, int);
  CREATE OR REPLACE FUNCTION nanoid_optimized(
      size int, -- The desired length of the generated string.
      alphabet text, -- The set of characters to choose from for generating the string.
      mask int, -- The mask used for mapping random bytes to alphabet indices. Should be `(2^n) - 1` where `n` is a power of 2 less than or equal to the alphabet size.
      step int -- The number of random bytes to generate in each iteration. A larger value may speed up the function but increase memory usage.
  )
      RETURNS text -- A randomly generated NanoId String
      LANGUAGE plpgsql
      VOLATILE
      LEAKPROOF
      PARALLEL SAFE
  AS
  $$
  DECLARE
      idBuilder      text := '';
      counter        int  := 0;
      bytes          bytea;
      alphabetIndex  int;
      alphabetArray  text[];
      alphabetLength int  := 64;
  BEGIN
      alphabetArray := regexp_split_to_array(alphabet, '');
      alphabetLength := array_length(alphabetArray, 1);

      LOOP
          bytes := gen_random_bytes(step);
          FOR counter IN 0..step - 1
              LOOP
                  alphabetIndex := (get_byte(bytes, counter) & mask) + 1;
                  IF alphabetIndex <= alphabetLength THEN
                      idBuilder := idBuilder || alphabetArray[alphabetIndex];
                      IF length(idBuilder) = size THEN
                          RETURN idBuilder;
                      END IF;
                  END IF;
              END LOOP;
      END LOOP;
  END
  $$;
commit;
