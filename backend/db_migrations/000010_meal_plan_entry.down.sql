begin;
  drop function app.duplicate_meal_plan(bigint, bigint);
  drop table app.meal_plan_entry cascade;
commit;
