FROM mhart/alpine-node:12.14.1

WORKDIR /app/

RUN yarn global add serve

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000

CMD [ "serve", "-l", "3000", "-s", "dist" ]