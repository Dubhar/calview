FROM node:22-alpine

WORKDIR /calendar

# setup init system to handle signals
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

# install dependencies
COPY package*.json ./
RUN npm install

# install application
COPY public/ ./public/
COPY src ./src/

RUN chown -R node .
USER node

EXPOSE 3000
CMD ["npm", "start"]
