FROM node:18

WORKDIR /usr/src/app

# Копируем package.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходники сервиса
COPY apps/reader-mgt ./apps/reader-a

# Копируем общую Prisma-библиотеку
COPY libs/prisma ./libs/prisma

# Генерируем Prisma Client
RUN npx prisma generate --schema=./libs/prisma/schema.prisma

# Собираем TypeScript (если нужно)
RUN npm run build

CMD ["node", "dist/main.js"]
