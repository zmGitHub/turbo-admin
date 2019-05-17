node -v
ifconfig
hostname
df -lh
pwd
npm i


FROM terminus/herd:1.0.2-beta.13

COPY package.json /turbo/
COPY package-lock.json /turbo/
COPY config.js /turbo/
COPY node_modules /turbo/node_modules
COPY servers /turbo/servers
COPY dist /turbo/dist


WORKDIR /turbo

EXPOSE 3001

CMD NODE_ENV=development node ./servers/index.js
