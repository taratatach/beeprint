FROM node:10.5.0-alpine
LABEL maintainer "Erwan Guyader <erwan@sogilis.com>"
LABEL name "BeePrint"

WORKDIR /app

RUN npm install -g yarn

COPY package.json .
COPY package-lock.json .
RUN yarn install

COPY . .

RUN yarn link
RUN chmod +x entry.sh

ENTRYPOINT ["/app/entry.sh"]
CMD []
