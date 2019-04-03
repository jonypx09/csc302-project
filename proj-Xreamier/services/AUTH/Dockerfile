FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

RUN mkdir ./AUTH
RUN mkdir ./PGDB
RUN mkdir ./MAILINATOR

COPY ../AUTH/package*.json ./AUTH
COPY ../PGDB/package*.json ./PGDB
COPY ../MAILINATOR/package*.json /MAILINATOR

WORKDIR /usr/src/app/MAILINATOR
RUN npm install

WORKDIR /usr/src/app/PGDB
RUN npm install

WORKDIR /usr/src/app/AUTH
RUN npm install

WORKDIR /usr/src/app

# Bundle app source
COPY ../AUTH/ ./AUTH
COPY ../PGDB/ ./PGDB
COPY ../MAILINATOR ./MAILINATOR

WORKDIR /usr/src/app/AUTH

EXPOSE 3000
CMD [ "npm", "start" ]