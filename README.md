# Backend System for graphql

For Windows, see [Setting up the backend (postgraphile) on Windows](../../wiki/Setting-up-the-backend-(postgraphile)-on-Windows)

setup hooks
```
cp hooks/pre-commit.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

## :hammer: Setup

To set this up, you'll have to do the following. 

```
$ docker-compose run graphql bash
root@container_id:/app# createdb -h db -U postgres $DBNAME
root@container_id:/app# ./db-reset.sh
root@container_id:/app# psql -h db -d $DBNAME -U postgres -f seed.sql
```

## :rocket: Running

You can then start the GraphQL server and the frontend with the following command.

```
$ docker-compose up
```

You can now visit the graphiql interface at [http://localhost:4000](http://localhost:4000).
You can now visit the UI at [http://localhost:3000](http://localhost:3000).
