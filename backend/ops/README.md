This is a temporary way to deploy to heroku.

I have setup an AWS RDS instance using this terraform script. To deploy this to heroku, we'd just have to do the following.

```
$ cd backend/ops
$ terraform init
$ terraform apply
```

This should output the `password` and `db_host`. It sets up a publicly accessible instance. While it is probably a bad idea for real production but it should be okay for dev, qa and staging environments.

```
$ cd backend/
$ heroku login
$ heroku container:login
$ heroku create # this should give us an app name
$ heroku container:push -a <appname> web
$ heroku container:release -a <appname> web
$ heroku config:set -a PGHOST=<db_host>
$ heroku config:set -a PGDATABASE=<mealplanner>
$ heroku config:set -a PGUSER=postgres
$ heroku config:set -a PGPASSWORD=<password>
$ heroku config:set -a JWT_SECRET=<password>
$ heroku config:set -a DATABASE_URL=postgres://postgres:<password>@<db_host>/mealplanner?ssl=true
$ heroku config:set -a OWNER_DATABASE_URL=postgres://postgres:<password>@<db_host>/mealplanner?ssl=true
$ heroku run -a <appname> --type=worker db-reset.sh
$ heroku resetart -a <appname>
```

You should now be able to visit the url for the `<appname>`.


