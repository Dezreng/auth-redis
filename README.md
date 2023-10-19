# Session authentication: Express + Redis
To run, you must have: Docker, NodeJs, NPM installed. To run the application, run the following commands.

> git clone

Open the project folder in the console and run the command

> npm i

To run the application via docker, run the command

> docker-compose up -d

To make sure that the session ID is saved in Redis, open a connection to the Redis server and run the commands.

>docker exec -it auth-with-redis-redis-1 redis-cli
>keys *