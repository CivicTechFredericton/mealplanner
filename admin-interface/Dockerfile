from node:12

workdir /app
copy . .

run npm install
run npm install parcel-bundler
run node_modules/.bin/parcel build ./src/html/index.html
run npm install http-server

expose 2000
cmd ["npx", "http-server", "dist", "-p", "2000"]
