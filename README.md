# drones-api

## Description

API Rest to manage our fleet of drones following the specified requirements [here](./Code%20Challenge%20Drone.V1.pdf).

## Public API

The API Rest is hosted in the cloud and publicly accessible:

- https://drones-api-production.up.railway.app/

## Public Swagger

The app was published publicly and can be accessed here

- https://drones-api-production.up.railway.app/api

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

- Open the swagger locally and start to play: http://localhost:3000/api/

## Running the unit tests

```bash
# unit tests
npm run test
```

## Demo videos

- [Demo video 1](https://drive.google.com/file/d/1VL7ctEUzjbxJ2B2MvzOtCyjPLKWpw2-J/view?usp=sharing)

- [Demo video 2](https://drive.google.com/file/d/1EKyzS4FMDmiV03Zctgejoun5BcFbL2P6/view?usp=sharing)

- [Demo video 3](https://drive.google.com/file/d/1a8DSe9Ld4_-JqpiAQpB7xHum2hszG0iS/view?usp=sharing)





