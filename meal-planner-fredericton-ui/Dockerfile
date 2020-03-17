from node:12

workdir /app

copy package.json package.json
copy package-lock.json package-lock.json

run npm install

copy . .

expose 3000
cmd ["npm", "start"]
