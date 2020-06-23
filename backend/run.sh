DATABASE_URL="postgres://postgres:password123@localhost:5533/$DBNAME?sslmode=disable" \
ENABLE_SSH="false" \
DATABASE_URL="postgres://app_graphile:password123@localhost:5533/$DBNAME?sslmode=disable" \
OWNER_DATABASE_URL="postgres://postgres:password123@localhost:5533/$DBNAME?sslmode=disable" \
JWT_SECRET=AVerySecretString \
PGPASSWORD=password123 \
DBNAME="$DBNAME" \
npm start
