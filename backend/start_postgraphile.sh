#!/bin/bash

sleep 10

PGPASSWORD=${POSTGRES_PASSWORD} psql -U postgres -h db  -f db-reset.psql
npm start
