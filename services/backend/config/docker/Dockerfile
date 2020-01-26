FROM mhart/alpine-node:12.14.1

WORKDIR /app/

COPY . .

EXPOSE 4000

RUN yarn

CMD [ "node", "index.js" ]