# API de Controle de Refeições

API REST para controle de refeições e calorias consumidas, desenvolvida com Node.js, TypeScript, Fastify e Prisma.

## Funcionalidades

- Cadastro de refeições (café da manhã, almoço, lanche e jantar)
- Listagem de todas as refeições
- Filtro de refeições por período
- Armazenamento de informações como: alimento, período, gramas e calorias

## Requisitos

- Node.js 20.x
- npm ou yarn
- SQLite (incluído no projeto)

## Configuração do Ambiente

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure o arquivo .env:
```
DATABASE_URL="file:./dev.db"
```

4. Execute as migrações do banco de dados:
```bash
npx prisma migrate deploy
```

## Executando o Projeto

### Desenvolvimento

Para executar em modo de desenvolvimento com recarga automática:

```bash
npm run dev
```

### Produção

Para build e execução em produção:

```bash
npm run build
npm start
```

## Executando com Docker

1. Construa a imagem:
```bash
docker build -t meals-api .
```

2. Execute o container:
```bash
docker run -p 3333:3333 meals-api
```

## Endpoints da API

- `POST /meals` - Criar uma nova refeição
- `GET /meals` - Listar todas as refeições
- `GET /meals/:period` - Listar refeições por período (BREAKFAST, LUNCH, SNACK, DINNER)

### Exemplo de payload para criação de refeição:

```json
{
  "food": "Arroz com Feijão",
  "period": "LUNCH",
  "grams": 300,
  "calories": 400
}
```

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Fastify
- Prisma (ORM)
- SQLite
- Docker
- Zod (Validação)