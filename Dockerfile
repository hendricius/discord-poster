FROM node:latest

# Create the directory!
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# Copy and Install our bot
COPY package.json /usr/src/bot
RUN npm install --only=production

# Our precious bot
COPY . /usr/src/bot

EXPOSE 443

CMD [ "npm", "run", "start" ]