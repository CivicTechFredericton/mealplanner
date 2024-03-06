# Backend System for graphql

## Setting up local postgraphile backend

If you are unable or unwilling to run docker on your development machine, you could instead set up the services locally. If you are able to run Docker then skip this section. 

For Windows, see [Setting up the backend (postgraphile) on Windows](../../wiki/Setting-up-the-backend-(postgraphile)-on-Windows)

For Ubuntu, see [Setting up the backend (postgraphile) on Ubuntu](../../wiki/Setting-up-the-backend-(postgraphile)-on-Ubuntu)

## Setting up front and backend with Docker

The mealplanner project can be built and run using docker-compose on platforms that support Docker (Linux, MacOS, Windows 10)

In the main project directory there is a docker-compose.yml file that will build and run three containers: postgres, graphl backend and the frontend application. The postgres container uses a standard psotgres image from docker hub, the other two will be built on top of the node:12 container. The Dockerfiles in the backend and meal-planner-fredericton-ui directories describe the builds.

### Pre-requisites

Before composing the application you must ensure that Docker is installed and functioning. A quick check is to run `docker version` on the command line to see if you get any output. If you get an error, see the Docker set up for your platform.

 - Ubuntu - this should be as simple as `sudo apt install docker docker-compose docker.io python3-docker python3-dockerpty` . To enable Docker access for the current user, run the following command in the terminal: `sudo usermod -a -G docker $USER`. It's important to note that after running the command, you need to log out and log back in for the changes to take effect.
 - MacOS [Docker Desktop for Mac](https://docs.docker.com/docker-for-mac/install/)
 - Windows 10 [Docker Desktop for Windows 10](https://docs.docker.com/docker-for-windows/install/)

It is recommended to perform the install and "getting started" steps for Docker Desktop before proceeding.

## Important Notice

**Please Read Before Installing Docker Desktop and KVM on Linux**

If you are using a Linux-based operating system, such as Ubuntu, it is important to note that Docker Desktop and KVM (Kernel-based Virtual Machine) are already included in the Linux kernel and installing them separately can lead to conflicts and issues with your environment.

**DO NOT INSTALL Docker Desktop or KVM ON LINUX**

Installing Docker Desktop or KVM separately on a Linux system can cause conflicts with the existing Docker and virtualization components, leading to unexpected behavior and instability. It is recommended to use the native Linux tools for Docker and virtualization.

If you are running a Linux distribution, Docker can be installed directly from the package manager or official Docker repositories. Similarly, KVM and related tools are available as part of the Linux kernel.

Please refer to the official documentation or community resources specific to your Linux distribution for guidance on installing and managing Docker and KVM.


Now that Docker is available, set up the environment for the composed applications.  In the main project folder, where the `docker-compose.yml` file is, create a file named `.env` and add two variables to it. These are a database password and a token secret. Both should be treated like passwords and should be reasonably unique and random.  This is and example (please don't use these passwords, create your own):

```
POSTGRES_PASSWORD=databasepassword
JWT_SECRET=signingsecret
```
Now, in the same folder run `docker-compose up`. Docker compose will download base images and begin the container builds.  If all is well, the graphql server will be available at `http://localhost:4000/graphql` or `http://localhost:4000/graphiql`. The frontend UI will be available at `http://localhost:3000`. If you only want to run the DB and GraphQL services in docker, run `docker-compose up graphql`

If you are unfamiliar with Docker and find that you have gotten your application into a weird state, you can reset the whole thing with a couple of commands:

```
docker-compose down -v --rmi all
docker system prune
docker volume prune
```
After this, 
For production or testing:
`docker-compose up --build` will rebuild containers from scratch 

For development, use 

```
export COMPOSE_FILE=docker-compose-dev.yml
docker-compose up --build
```

### populating sample data
On the initial build and startup, the database will be completely empty. There won't even be an account created for logging in. To populate the database with a handful of users and some recipe material run the appropriate version of the following docker-compose commands to seed the database.

On Linux or MacOS:

```
cat ./backend/seed.sql | docker-compose exec -T db /usr/bin/psql -U postgres -f -
cat ./backend/meal_seed.sql | docker-compose exec -T db /usr/bin/psql -U postgres -f -
```

On Windows (Powershell):

```
Get-Content .\backend\seed.sql | docker-compose exec -T db /usr/bin/psql -U postgres -f -

```


Pay careful attention to the output as it will include the randomly generated passwords for the default users. This will look something like the following but the passwords will be unique each time:

```
BEGIN
psql:<stdin>:114: NOTICE:     Admin login: admin@example.com        676538dc8285f2c
psql:<stdin>:114: NOTICE:  Designer login: mealdesigner@example.com bd99ff9537fdc63
psql:<stdin>:114: NOTICE:     User1 login: user1@example.com        8fc76f1a89d08cb
psql:<stdin>:114: NOTICE:     User2 login: user2@example.com        10d3b4cba908d72
DO
COMMIT
```

## For v2

After the database and the graphQL servers are up and running, under `mealplanner-ui` folder run the following command.

```
$ npm i
$ npm start
```

This should start the server on http://localhost:3333/

## To add some automatic linting on your commits:

setup hooks

```
cp hooks/pre-commit.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

