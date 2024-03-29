ARG NODE_VERSION=12
ARG NODE_ENV=production

# APPLICATION DEPENDENCIES

FROM node:${NODE_VERSION}-slim AS dependencies
WORKDIR /home/node/

RUN apt-get update
RUN apt-get install -y build-essential python3

COPY . .

RUN yarn global add rimraf

RUN yarn install --frozen-lock
RUN yarn build

# APPLICATION EXECUTION

FROM node:${NODE_VERSION}-slim
WORKDIR /home/node/

COPY --from=dependencies /home/node .

ENV PATH="$PATH:/home/node/node_modules/.bin"
ENV NODE_ENV production
ENV PORT 80

EXPOSE 80

CMD ["node", "."]