# drones-api

## Description

## Requirements to run the project

- Node.js v18 (Tested with v18.18.2)
- Docker

## Installation

- Make sure docker desktop is running

- Run a mongoDB instance locally:

```bash
docker run --name drones-mongo -p 27017:27017 -d mongo:7.0.3
```

- Rename the `.env.example` file to `.env`

- Install dependencies

```bash
npm install
```

- Run the command load our database with dummy data

```bash
npm run seed
```

## Running the app

```bash
npm run start

# watch mode
npm run start:dev
```

- Open the swagger and start to play: http://localhost:3000/api/

## Running the unites tests

```bash
# unit tests
npm run test
```
