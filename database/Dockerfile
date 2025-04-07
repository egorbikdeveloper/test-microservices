# libs/db/Dockerfile

FROM node:18

WORKDIR /app

COPY . .

RUN npm install
RUN npx prisma generate

CMD ["npx", "prisma", "migrate", "deploy"]
