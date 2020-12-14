#!/bin/bash

# test for the presence of the schema
export PGPASSWORD=${POSTGRES_PASSWORD}

psql -U postgres -h db  -c "select count(*) from app_private.account"
if [ $? != 0 ] || [ -f .reset-db ]; then
	psql -U postgres -h db -f db-reset.psql
fi
rm -f .reset-db
# run through the migrations
for sql in migrations/*.sql
do
	psql -U postgres -h db  -f "${sql}"
done
npm start
