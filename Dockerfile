FROM node:10-jessie
WORKDIR /frontend
COPY ./package.json .
RUN npm install
COPY . .
ENTRYPOINT ["npm", "start"]