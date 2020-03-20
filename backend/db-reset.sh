psql -h db -U postgres $DBNAME -c "drop schema if exists app_private, app cascade" && \
cat setup-user.sql | envsubst | psql -h db -U postgres -f - && \
psql -h db -U postgres $DBNAME -f 000-common-utils.sql  && \
psql -h db -U postgres $DBNAME -f 001-auth-system.sql && \
psql -h db -U postgres $DBNAME -f 002-nutrition.sql && \
psql -h db -U postgres $DBNAME -f 003-product.sql && \
psql -h db -U postgres $DBNAME -f 004-meal.sql && \
psql -h db -U postgres $DBNAME -f 005-measure.sql && \
psql -h db -U postgres $DBNAME -f 006-meal-plan.sql && \
psql -h db -U postgres $DBNAME -f 007-meal-plan-entry.sql && \
psql -h db -U postgres $DBNAME -f 008-pantry.sql && \
psql -h db -U postgres $DBNAME -f 009-authorize-meal-designer.sql && \
psql -h db -U postgres $DBNAME -f 010-shopping-list.sql && \
psql -h db -U postgres $DBNAME -f seed.sql
