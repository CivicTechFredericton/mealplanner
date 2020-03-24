from node:12

run echo "deb http://apt.postgresql.org/pub/repos/apt/ stretch-pgdg main" > /etc/apt/sources.list.d/pgdg.list
run wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
run apt-get update
run apt-get install -y postgresql-client-12 gettext-base

workdir /app
copy . .

run npm install

expose 22
expose 3000

entrypoint [".docker/entrypoint.sh"]
cmd ["./start_postgraphile.sh"]
