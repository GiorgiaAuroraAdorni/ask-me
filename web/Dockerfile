# DEVELOPMENT ENVIRONMENT
FROM node:10.12 AS dev

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]

# PRODUCTION BUILD ENVIRONMENT
FROM dev AS build

RUN npm run build

# PRODUCTION ENVIRONMENT
FROM nginx:1.15 AS production

COPY --from=build /app/build /usr/share/nginx/html
