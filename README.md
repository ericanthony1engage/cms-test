## Description

Content Management API Service using [Nest](https://github.com/nestjs/nest) framework TypeScript with PostgreSQL.

## Installation

```bash
$ npm install
```

## ENV setup
```bash
$ cp .env.template .env
```
Configure the database environment in .env don't forget to create a new database first.

## Migration setup
1. Create knexfile.js from knexfile.template.js
```bash
$ cp knexfile.template.js knexfile.js
```
2. Fill ```knexfile.js``` with your database configuration
3. Run migrations
```bash
$ npx ts-node ./node_modules/.bin/knex migrate:latest
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Available Endpoints

This application has the following endpoints:

1. `{{host}}/api/content/:id` - (GET) Get Content route. ```:id``` param must be an uuid
2. `{{host}}/api/content/` - (POST) Upload Content route. Accepting multipart/form-data with key ```file``` 

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
