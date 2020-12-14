BEGIN;

-- run this to add changes for issue 25

alter table app.meal add IF NOT EXISTS nutrition_rating integer default 10;


COMMIT;