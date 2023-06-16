FROM node:18.13.0

WORKDIR /graphql-api

COPY package*.json /graphql-api/
RUN npm install
COPY . .
CMD ["npm", "start"]