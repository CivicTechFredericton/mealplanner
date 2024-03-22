#!/bin/bash
set -e
export COMPOSE_FILE=docker-compose.yml
USR=ubuntu
HOST=develop.goodmealplan.com
SHA=$(git rev-parse --short HEAD)

build() {
    docker compose build graphql
    docker compose build frontend
    docker compose build admin

    docker image tag mealplanner-graphql:latest mealplanner-graphql:$SHA
    docker image tag mealplanner-admin:latest mealplanner-admin:$SHA
    docker image tag mealplanner-frontend:latest mealplanner-frontend:$SHA

    docker image save mealplanner-graphql:$SHA | gzip > deploy/images/mealplanner-graphql.tar.gz
    docker image save mealplanner-frontend:$SHA | gzip > deploy/images/mealplanner-frontend.tar.gz
    docker image save mealplanner-admin:$SHA | gzip > deploy/images/mealplanner-admin.tar.gz
}

copy() {
    ssh $USR@$HOST "mkdir -p /tmp/$SHA"
    scp deploy/images/mealplanner-admin.tar.gz $USR@$HOST:/tmp/$SHA/mealplanner-admin.tar.gz
    scp deploy/images/mealplanner-frontend.tar.gz $USR@$HOST:/tmp/$SHA/mealplanner-frontend.tar.gz
    scp deploy/images/mealplanner-graphql.tar.gz $USR@$HOST:/tmp/$SHA/mealplanner-graphql.tar.gz
}

extract() {
    ssh $USR@$HOST <<ENDSSH
        sudo su - mealplan
        mkdir -p images

        cp /tmp/$SHA/mealplanner-admin.tar.gz images/mealplanner-admin-$SHA.tar.gz
        cp /tmp/$SHA/mealplanner-graphql.tar.gz images/mealplanner-graphql-$SHA.tar.gz
        cp /tmp/$SHA/mealplanner-frontend.tar.gz images/mealplanner-frontend-$SHA.tar.gz

        gunzip images/mealplanner-admin-$SHA.tar.gz
        docker image load -i images/mealplanner-admin-$SHA.tar
        rm images/mealplanner-admin-$SHA.tar

        gunzip images/mealplanner-frontend-$SHA.tar.gz
        docker image load -i images/mealplanner-frontend-$SHA.tar
        rm images/mealplanner-frontend-$SHA.tar

        gunzip images/mealplanner-graphql-$SHA.tar.gz
        docker image load -i images/mealplanner-graphql-$SHA.tar
        rm images/mealplanner-graphql-$SHA.tar
ENDSSH
}

# build
# copy
extract
