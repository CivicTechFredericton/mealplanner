psql -c "drop schema if exists app_private, app cascade" && \
cat setup-user.sql | envsubst | psql -f - && \
psql -f 000-common-utils.sql  && \
psql -f 001-auth-system.sql && \
psql -f 002-nutrition.sql && \
psql -f 003-product.sql && \
psql -f 004-meal.sql && \
psql -f 005-measure.sql && \
psql -f 006-meal-plan.sql && \
psql -f 007-meal-plan-entry.sql && \
psql -f 008-pantry.sql && \
psql -f 009-authorize-meal-designer.sql && \
psql -f 010-shopping-list.sql && \
psql -f seed.sql
