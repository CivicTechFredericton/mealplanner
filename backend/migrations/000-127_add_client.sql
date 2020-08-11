BEGIN;

-- run this to add changes for issue 127
-- and also please run 005_2-clients.sql

alter table app.meal_plan add IF NOT EXISTS  client_id bigint REFERENCES app.clients(id);
create index IF NOT EXISTS idx_meal_plan_client_id on app.meal_plan(client_id);

COMMIT;