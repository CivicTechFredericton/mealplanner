dropdb --if-exists -h db -U postgres $DBNAME && createdb -h db -U postgres $DBNAME
cat setup-user.sql | envsubst | psql -h db -U postgres -f - && \
psql -h db -U postgres $DBNAME -f 000-common-utils.sql  && \
psql -h db -U postgres $DBNAME -f 001-auth-system.sql && \
psql -h db -U postgres $DBNAME -f 002-nutrition.sql && \
psql -h db -U postgres $DBNAME -f 003-product.sql && \
psql -h db -U postgres $DBNAME -f 004-meal.sql && \
psql -h db -U postgres $DBNAME -f 005-ingredient.sql
