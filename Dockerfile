FROM node:16

# Create the directory!
WORKDIR /usr/src/app

# Our precious app
COPY . .
RUN npm install
RUN npm run build

#Expose needed ports
EXPOSE 443
EXPOSE 8080

CMD npm run start