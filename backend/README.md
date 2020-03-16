# Backend System for graphql

## :hammer: Setup

To set this up, you'll have to do the following.

```
$ docker-compose run graphql bash
root@container_id:/app# ./db-reset.sh
root@container_id:/app# psql -h db -d $DBNAME -U postgres -f seed.sql
```

## :rocket: Running

You can then start the GraphQL server with the following command.

```
$ docker-compose up graphql
```

You can now visit the graphiql interface at [http://localhost:3000](http://localhost:3000).
