# About us

Authentication server for saving games

## Tech Stack

**Server:** Express


## Features

- A full featured API with authentification by JWT tokens.

Cf. [Release section](https://github.com/Germain-L/Yams-Master/releases)

### Environment Variables

To run this project, you will need to add the following environment variables into your file : `.env`

| Name             | Example                                                                                     | Type   | Description                                  |
|------------------|---------------------------------------------------------------------------------------------|--------|----------------------------------------------|
| JWTKEY           | MyScretKey                                                                                  | string | JWT Secrets                                  |
| MONGODB_URI      | [MongoDB Atlas](https://www.mongodb.com/resources/products/platform/mongodb-atlas-tutorial) | string | Mongo URL                                    |
| MONGODB_DATABASE | yams_master                                                                                 | string | Mongo Database name                          |
| FRONTEND_URL     | http://localhost:8081                                                                       | string | Expo Web App                                 |
| NODE_ENV         | development                                                                                 | string | Express Environment (development/production) |
| API_HOSTNAME     | localhost                                                                                   | string | API Hostname                                 |
| PORT             | 3002                                                                                        | string | Express Port                                 |



## Run Locally
*❗ You can't run this project without the keys needed for authentification*

### Clone the project

```bash
  git clone https://github.com/Germain-L/Yams-Master.git
```

Go to the project directory

```bash
  cd Yams-Master/auth-server
```

### Install dependencies

```bash
  npm ci
```

Then start a terminal for each commands

```bash
  npm run start
```

Now you can go on your browser and type :
- http://localhost:8000/api/auth/login to get to the application website.

## Authors
- [@ClemLcs](https://github.com/ClemLcs)