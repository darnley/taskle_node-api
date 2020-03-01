ARG NODE_VERSION=12
ARG NODE_ENV=production

# APPLICATION DEPENDENCIES

FROM node:${NODE_VERSION}-slim AS dependencies
WORKDIR /home/node/

RUN apt-get update
RUN apt-get install -y build-essential

COPY . .

RUN yarn global add rimraf

RUN yarn install --frozen-lock
RUN yarn build

RUN rimraf node_modules
RUN yarn install --frozen-lock --production

# APPLICATION EXECUTION

FROM node:${NODE_VERSION}-slim
WORKDIR /home/node/

COPY --from=dependencies /home/node .

ENV PATH="$PATH:/home/node/node_modules/.bin"
ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

CMD ["node", "."]