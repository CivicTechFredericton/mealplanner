dropdb -h db -U postgres --if-exists $DBNAME && createdb -h db -U postgres $DBNAME
cat setup-user.sql | envsubst | psql -h db -U postgres -f - && \
psql -h db -U postgres $DBNAME -f 000-common-utils.sql  && \
psql -h db -U postgres $DBNAME -f 001-auth-system.sql 