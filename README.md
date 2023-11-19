# NestJS-Request-Rate-Limiter
Sample Request Rate Limiter Application using NestJS, Redis, MongoDB and Sliding Window Algorithm.

![nestjs-mongo](https://github.com/mehmetnuribolat/User-Auth-Service-NestJS/assets/145845943/697c57c4-9e28-4db5-96b8-f5924ee66b02)

## Features
- Redis for Caching.
- Implementation of Sliding Window Algorithm.
- Server Clustering.
- Simple Authentication Middleware.
- Request Rate Limiter Middleware for Public and Private Routes.
- Reading environment variables from .env file.
- Database Seeding.
- Documentation of API using Swagger and Adding Custom Authentication for Swagger Document.
- Simple Health Check Operation for Mongoose.
- Clean Architecture.

## 💻 Tech Stack

- Environment: [Node.js](https://nodejs.org/)
- Framework: [Nest.js](https://nestjs.com/)
- Database: [MongoDB](https://www.mongodb.com/)
- Language: [TypeScript](https://www.typescriptlang.org/)
- Cache-Store: [Redis](https://redis.io/)
- Health Check: [Terminus](https://github.com/nestjs/terminus)
- Object-Modelling: [Mongoose](https://mongoosejs.com/)
- Documentation: [Swagger](https://swagger.io/)
- Linting: [ESLint](https://eslint.org/)
- Code Formatting: [Prettier](https://prettier.io/)

## ⌨️ Development

First, you need to set all environment variables in `.env`. 
- You need to create MongoDB Connection String (`MONGO_CONNECTION_STRING`).
- You need to create Redis Connection Settings (`REDIS_HOST`, `REDIS_PORT`).
- `NOTE!`: `.env` file shared on this github repository.

### Install dependencies:

```
npm install
```

### Database Seeding:

```
npm run build
```
```
npm run seed
```
### Execute MongoDB and Redis on Docker:

```
docker-compose up
```

### Execute application on development mode:

```
npm run start:debug
```

- Application will start on port number (`PORT`) which defined on `.env`
- For accessing Swagger Documentation, you should use http://localhost:3000/docs (for `PORT`= 3000) and you should use Username `SWAGGER_USERNAME`, `SWAGGER_PASSWORD` to login Swagger Documentation Page.

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/mehmetnuribolat/NestJS-Request-Rate-Limiter/issues).

## :pray: Show your support

Give a ⭐️ if this project helped you!

## 📝 License

This project is under [MIT](https://github.com/mehmetnuribolat/NestJS-Request-Rate-Limiter/blob/main/LICENSE) license.

