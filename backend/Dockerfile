from node:18
run apt-get update && apt-get install -y wget gnupg2
run echo "deb http://apt.postgresql.org/pub/repos/apt/ bullseye-pgdg main" > /etc/apt/sources.list.d/pgdg.list
run wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
run apt-get update
run apt-get install -y postgresql-client-12 gettext-base

workdir /app
copy . .

run npm install

expose 4000
cmd ["/bin/bash","start_postgraphile.sh"]
