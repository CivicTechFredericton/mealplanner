# Backend System for graphql

## Setting up local postgraphile backend

If you are unable or unwilling to run docker on your development machine, you could instead set up the services locally. If you are able to run Docker then skip this section. 

For Windows, see [Setting up the backend (postgraphile) on Windows](../../wiki/Setting-up-the-backend-(postgraphile)-on-Windows)

For Ubuntu, see [Setting up the backend (postgraphile) on Ubuntu](../../wiki/Setting-up-the-backend-(postgraphile)-on-Ubuntu)

## Setting up front and backend with Docker

The mealplanner project can be built and run using docker-compose on platforms that support Docker (Linux, MacOS, Windows 10 **Pro**)

In the main project directory there is a docker-compose.yml file that will build and run three containers: postgres, graphl backend and the frontend application. The postgres container uses a standard psotgres image from docker hub, the other two will be built on top of the node:12 container. The Dockerfiles in the backend and meal-planner-fredericton-ui directories decribe the builds.

### Pre-requisites

Before composing the application you must ensure that Docker is installed and functioning. A quick check is to run `docker version` on the command line to see if you get any output. If you get an error, see the Docker set up for your platfrom.

 - Ubuntu - this should be as simple as `sudo apt install docker docker-compose docker.io python3-docker python3-dockerpty`
 - MacOS [Docker Desktop for Mac](https://docs.docker.com/docker-for-mac/install/)
 - Windows 10 *Home* [Docker Desktop for Windows 10 Home](https://docs.docker.com/docker-for-windows/install-windows-home/)
 - Windows 10 *Pro* or *Enterprise* [Docker Desktop for Windows 10](https://docs.docker.com/docker-for-windows/install/)

It is recomended to perform the install and "getting started" steps for Docker Desktop before proceeding.

Now that Docker is available, set up the environment for the composed applications.  In the main project folder, where the `docker-compose.yml` file is, create a file named `.env` and add two variables to it. These are a databse password and a token secret. Both should be treated like passwords and should be reasonably unique and random.  This is and example (please don't use these passwords, create your own):

```
POSTGRES_PASSWORD=databasepassword
JWT_SECRET=signingsecret
```
Now, in the same folder run `docker-compose up`. Docker compose will download base images and begin the container builds.  If all is well, the graphql server will be available at `http://localhost:4000/graphql` or `http://localhost:4000/graphiql`. The frontend UI will be available at `http://localhost:3000`

If you are unfamiliar with Docker and find that you have gotten your application into a weird state, you can reset the whole thing with a couple of commands:

```
docker-compose down -v --rmi all
docker volume prune
```
After this, `docker-compose up` will rebuild containers from scratch.

### populating sample data
On the initial build and startup, the database will be completely empty. There won't even be an account created for logging in. To populate the databse with a handful of users and some recipe material run the following docker-compose command to seed the database:

```
docker-compose exec -T db /usr/bin/psql -U postgres -f - < backend/seed.sql
```

Pay careful attention to the output as it will include the randomly generated passwords for the defaul users. This will look something like the following but the passwords will be unique each time:

```
BEGIN
psql:<stdin>:114: NOTICE:     Admin login: admin@example.com        676538dc8285f2c
psql:<stdin>:114: NOTICE:  Designer login: mealdesigner@example.com bd99ff9537fdc63
psql:<stdin>:114: NOTICE:     User1 login: user1@example.com        8fc76f1a89d08cb
psql:<stdin>:114: NOTICE:     User2 login: user2@example.com        10d3b4cba908d72
DO
COMMIT
```

## To add some automatic linting on your commits:

setup hooks

```
cp hooks/pre-commit.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

