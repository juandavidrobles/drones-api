# drones-api

## Description

API Rest to manage our fleet of drones following the specified requirements [here](./Code%20Challenge%20Drone.V1.pdf).

### Endpoints

#### 1. Drones

- Get all drones - `GET /drones`

- Get drone by id - `GET /drones/{id}`

- Create a drone - `POST /drones`

- Update a drone - `PUT /drones/{id}`

- Get loaded medication onto drone - `GET /drones/{id}`

- Get available drones for loading - `GET /drones/available-for-loading`

- Load medication onto drone - `PUT /drones/{id}/load`

- Remove medications from drone - `PUT /drones/{id}/remove-load`

### 2. Medications

- Get all medications - `GET /medications`

- Get medication by id - `GET /medications/{id}`

- Create a medication - `POST /medications`

- Update a medication - `PUT /medications/{id}`

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
