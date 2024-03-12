
begin;
  do language plpgsql $$
  declare
    admn app.person;
    user1 app.person;
    user2 app.person;
    meal_designer app.person;
    person_pass text;

  begin
    select substring(encode(digest(random()::TEXT,'sha256'),'hex') from 0 for 16) into person_pass;
    admn := app.register_person('Admin', 'admin@example.com', person_pass);
    raise notice '   Admin login: admin@example.com        %', person_pass;
    select substring(encode(digest(random()::TEXT,'sha256'),'hex') from 0 for 16) into person_pass;
    meal_designer := app.register_person('Meal Designer', 'mealdesigner@example.com', person_pass);
    perform app.authorize_meal_designer(meal_designer.id);
    raise notice 'Designer login: mealdesigner@example.com %', person_pass;
    select substring(encode(digest(random()::TEXT,'sha256'),'hex') from 0 for 16) into person_pass;
    user1 := app.register_person('User One', 'user1@example.com', person_pass);
    raise notice '   User1 login: user1@example.com        %', person_pass;
    select substring(encode(digest(random()::TEXT,'sha256'),'hex') from 0 for 16) into person_pass;
    user2 := app.register_person('User Two', 'user2@example.com', person_pass);
    raise notice '   User2 login: user2@example.com        %', person_pass;
   end;
   $$;
commit;
