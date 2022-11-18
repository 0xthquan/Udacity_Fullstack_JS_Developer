# Storefront Backend Project

## Set up
`docker-compose up`

```
psql -h 127.0.0.1 postgres
CREATE USER thquan WITH PASSWORD '123zxc';
ALTER USER thquan WITH SUPERUSER;
CREATE DATABASE storefront;
CREATE DATABASE storefront_test;
```
`npm install -g db-migrate`

`db-migration up`

`npm install`

#### File .env
```
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_DB=storefront
POSTGRES_USER=thquan
POSTGRES_PASSWORD=123zxc

POSTGRES_DB_TEST=storefront_test
POSTGRES_PORT_TEST=5432

BCRYPT_PASSWORD=belive-in-love
SALT_ROUNDS=10
TOKEN_SECRET=testtoken

ENV=dev
```

## Start the app

`npm run start`

url: `localhost:3000`

You can import `Storefront.postman_collection.json and Storefront.postman_environment.json` to postman to test
## Test the app

`npm run test`