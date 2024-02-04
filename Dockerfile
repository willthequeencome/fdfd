FROM node:18-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY package*.json .

RUN npm install


EXPOSE 3000

CMD ["node", "index.js"]
