# Nest Paginator

> Paginate data with Nest and TypeORM

Project to show examples on how to use [nest-paginator](https://github.com/brunosm16/nest-paginator)

## Installation
Go to the root directory of this application and run the following commands for Windows, Mac & Linux:

```sh
npm i
npm start or npm start:dev to hot-reload
```
Now the application it's running at port 3000

## Usage example

### Running database
1. You can run this application database locally with the following command:

```sh
	sudo docker compose up
```
2. This step it's going to pull up a container locally in your machine.

### Running nestjs application
1. Import a postman collection inside [docs](./docs/).
2. Access the endpoints with application running.
3. This example has a endpoint called /create-mock-sample that creates data for you to test locally.
4. On method findAllPaginated you can test nest-paginator by paginating data. You can pass parameters such as `page` `limit` to query data.

## Tests

```sh
npm test
```

## Meta

Bruno Moraes – [@Linkedin](https://www.linkedin.com/in/bruno-silveira22/) – brunoskr23@gmail.com

[Github](https://github.com/brunosm16)
