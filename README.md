# Session authentication: Express + Redis
To run, you must have: Docker, NodeJs, NPM installed. To run the application, run the following commands.

> git clone

Open the project folder in the console and run the command

> npm i

To run the application via docker, run the command

> docker-compose up -d

To make sure that the session ID is saved in Redis, open a connection to the Redis server and run the commands.

```
docker exec -it auth-with-redis-redis-1 redis-cli
keys *
```

## .ENV example

```
PORT=3000
REDIS_DB_URL=redis:6379
SECRET=awswa
CRYPTO_SECRET=awsaww
```

### Req example
For create user, use path and json (POST)

```
http://localhost:3000/auth/signup

{
    "firstName": "egor",
    "lastName": "Kor4",
    "password": "test",
    "email": "test3@kids.org",
    "balance": "14"
}

```

For auth user, use path and json (POST)

```
http://localhost:3000/auth

{
    "password": "test",
    "email": "test3@kids.org"
}

```

For get user balance, use cookies that come from the method /auth (GET)

```
http://localhost:3000/balance

```
