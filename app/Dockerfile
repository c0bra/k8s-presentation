FROM node:8-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 80
ENV PORT=80

CMD ["node", "index.js"]
