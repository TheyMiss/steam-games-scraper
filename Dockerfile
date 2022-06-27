FROM node:17.5.0-alpine3.15
RUN addgroup admins && adduser -S -G admins admin
WORKDIR /steam-games
RUN chown -R admin:admins /steam-games
COPY package*.json ./
RUN npm install
USER admin
COPY . .
EXPOSE 3003
CMD ["npm", "run","dev"]