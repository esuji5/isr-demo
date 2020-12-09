
# For using remote container feature of VS Code. This is an image as developing environment.
FROM node:15.3.0 AS dev
RUN apt-get update && apt-get install vim -y && apt-get clean

# For using container
FROM node:current-alpine AS base
WORKDIR /base
COPY package*.json ./
RUN yarn install && yarn cache clean
COPY . .

FROM base AS build
ENV NODE_ENV=production
WORKDIR /build
COPY --from=base /base ./
RUN yarn build

FROM node:current-alpine AS production
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /build/package*.json ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public
RUN yarn add next && yarn cache clean

EXPOSE 3000
CMD yarn start


# For using container image as deploy package of Lambda function
# FROM amazon/aws-lambda-nodejs:12
# COPY pages/ ./pages
# COPY public/ ./public
# COPY styles/ ./styles
# COPY lambda.js package.json ./

# RUN npm install && npm run build
# CMD [ "lambda.handler" ]




