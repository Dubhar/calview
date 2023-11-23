FROM node:18-alpine

USER node
WORKDIR /calendar

# install dependencies
COPY --chown=node:node package*.json ./
RUN npm install

# install application
COPY --chown=node:node src ./

EXPOSE 5000
CMD ["node", "server.js"]
