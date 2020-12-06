#!/bin/bash
# sleep in case this is the first build, postgres takes time to init
sleep 5
# test for the presence of the schema
PGPASSWORD=${POSTGRES_PASSWORD} psql -U postgres -h db  -c "select count(*) from app_private.account"
if [ $? != 0 ] || [ -f .reset-db ]; then
	PGPASSWORD=${POSTGRES_PASSWORD} psql -U postgres -h db  -f db-reset.psql
fi
rm -f .reset-db
npm start
