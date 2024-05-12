# About us

Authentication server for saving games

## Tech Stack

**Server:** Express


## Features

- A full featured API with authentification by JWT tokens.

Cf. [Release section](https://github.com/Germain-L/Yams-Master/releases)

### Environment Variables

To run this project, you will need to add the following environment variables into your file : `.env`

| Name             | Type   | Description                                  |
|------------------|--------|----------------------------------------------|
| JWTKEY           | string | JWT Secrets                                  |
| MONGODB_URI      | string | Mongo URL                                    |
| MONGODB_DATABASE | string | Mongo Database name                          |
| FRONTEND_URL     | string | Expo Web App                                 |
| NODE_ENV         | string | Express Environment (development/production) |
| API_HOSTNAME     | string | API Hostname                                 |
| API_VERSION      | string | API version                                  |
| PORT             | string | Express Port                                 |



## Run Locally
*❗ You can't run this project without the keys needed for authentification*

### Clone the project

```bash
  git clone https://github.com/Germain-L/Yams-Master.git
```

Go to the project directory

```bash
  cd api
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