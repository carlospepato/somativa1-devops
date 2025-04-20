FROM node:20-alpine

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/
COPY .env.docker ./.env

# Instalar dependências e ferramentas necessárias
RUN apk add --no-cache openssl
RUN npm install

# Copiar o resto do código
COPY . .

# Gerar o cliente Prisma e executar as migrações
RUN npx prisma generate
RUN npx prisma migrate deploy

# Compilar o TypeScript
RUN npm run build

EXPOSE 3333

CMD ["npm", "start"]