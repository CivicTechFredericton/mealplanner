begin;
  drop schema if exists app_private cascade;
  drop schema if exists app cascade;
  drop function nanoid_optimized(int, text, int, int);
  drop function nanoid(int, text, float);
commit;
