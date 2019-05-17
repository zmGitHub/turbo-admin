FROM terminus/herd:1.0.2-beta.13

COPY public /hisense-frontend-web/public
COPY lib /hisense-frontend-web/lib
COPY node_modules /hisense-frontend-web/node_modules
COPY Pampasfile-*.js /hisense-frontend-web/
COPY invoke-filter.js /hisense-frontend-web/
COPY package.json /hisense-frontend-web/

WORKDIR /hisense-frontend-web

EXPOSE 8181
