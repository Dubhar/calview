FROM node:22-alpine

USER node
WORKDIR /calendar

# install dependencies
COPY --chown=node:node package*.json ./
RUN npm install

# install application
COPY --chown=node:node public/ ./public/
COPY --chown=node:node src ./src/

EXPOSE 3000
CMD ["npm", "start"]
