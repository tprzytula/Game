FROM mhart/alpine-node:12.14.1

RUN apk add --no-cache bash

WORKDIR /app/

COPY . .

EXPOSE 4000

RUN yarn

RUN chmod +x config/scripts/wait-for-it/wait-for-it.sh

ENTRYPOINT [ "config/scripts/wait-for-it/wait-for-it.sh", "mongo:27017", "--" ]

CMD [ "node", "index.js" ]