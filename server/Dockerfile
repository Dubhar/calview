FROM node:22-alpine

WORKDIR /calendar

# setup init system to handle signals
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

# install dependencies
COPY package*.json ./
RUN npm install

# install application
COPY src ./

# use non-root user
RUN chown -R node .
USER node

EXPOSE 5000
CMD ["node", "server.js"]
