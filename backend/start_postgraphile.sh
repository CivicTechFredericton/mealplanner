#!/bin/bash

# test for the presence of the schema
export PGPASSWORD=${POSTGRES_PASSWORD}

sleep 5

psql -U postgres -h $PG_HOST  -c "select count(*) from app_private.account"
if [ $? != 0 ] || [ -f .reset-db ]; then
	psql -U postgres -h $PG_HOST -f db-reset.psql
fi
rm -f .reset-db
# run through the migrations
for sql in migrations/*.sql
do
	psql -U postgres -h $PG_HOST  -f "${sql}"
done
node server.js
