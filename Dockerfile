#FROM node:16.3.0
FROM node:16.10

WORKDIR /var/www/html/localhost/stockAnalisysAngular

COPY package.json .

#COPY .env .

#COPY ./src ./src
COPY . .

RUN npm install -g npm@7.24.1

RUN npm install -g @angular/cli

RUN npm install

EXPOSE 4200

CMD ng serve --host 0.0.0.0 --configuration=production
