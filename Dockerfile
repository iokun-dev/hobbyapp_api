FROM node:12
WORKDIR /hobbyapi
COPY package.json /hobbyapi
RUN npm install
COPY . /hobbyapi
CMD ["npm", "start"]