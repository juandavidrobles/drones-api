# drones-api

## Description

## Requirements to run the project

Node.js v18 (Tested with v18.18.2)
Docker

## Installation

Run a mongoDB instance locally:

```bash
$ docker run --name some-mongo -p 27017:27017 -d mongo:ubuntu:22.04
```

Rename the `.env.example` file to `.env`

```bash
$ npm install
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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
