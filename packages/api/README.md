# Sabiá API

## Table of Contents

- [Running the API Server](#running-the-api-server)
- [Running the Tests](#running-the-tests)
- [API Documentation](#api-documentation)
- [Using Fake Values](#using-fake-values)
- [Pushing the Data to Algolia](#pushing-the-data-to-algolia)
- [Sending Emails](#sending-emails)
- [Uploading Files](#uploading-files)
- [Adonis Framework](#adonis-framework)

## Running the API Server

1. Rename the `.env.example` to `.env` and replace the variables values.
2. Make sure the `DB_HOST`, `DB_PORT`, `DB_USER` and `DB_PASSWORD` have been correctly filled before going to the next steps.
3. Install the dependencies: `npm install`.
4. Run the migrations in order to create the tables:
```
npm run migration:run
```
5. Fill the database with the default values:
```
npm run seed:default
```
6. Make sure the `APP_KEY` variable has been filled in the `.env` file (you can run `adonis key:generate` if you want or choose any value).
7. Start the server: `npm start` (`npm run dev` for develop mode).
8. The API server will be available at `http://127.0.0.1:3333`.

## Running the Tests

After updating the environment variables in the `.env.testing` file, run:
```
npm run test
```

If you want to take a look at the code coverage, run:

```
npm run coverage
```

P.S.: the API server will use the user (`DB_USER`) and password (`DB_PASSWORD`) values set in the `.env` file to connect to the database server.

## API Documentation

This project has been documented by using the [apiDoc](https://apidocjs.com/) library. Use the following script to generate the documentation:
```
npm run apidoc
```
After generating the documentation files, you can start the API server and visit `http://localhost:3333/apidoc` to see the documentation.

## Using Fake Values
You can run the following command in order to fill the data with fake data:
```
npm run seed
```
P.S.: Make sure you have set [Algolia](#algolia) before running the seed command.

## Pushing the Data to Algolia

In order to use algolia, you should create an account on the [Algolia website](https://www.algolia) (there is a free account option) and set the `ALGOLIA_APP_ID` (Application ID) and `ALGOLIA_ADMIN_KEY` (Admin API) variables.

The algolia index name is `searchable_data` by default, but you can replace it by setting a new `ALGOLIA_INDEX_NAME` variable value.

Before running the API server, you should push all of the database data to algolia by running the following command:
```
npm run algolia:index
```

## Sending Emails

In order to send emails, you should update the SMTP information by setting the following environment variables:

```
SMTP_PORT=
SMTP_HOST=
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_FROM=noreply@plataformasabia.com.br
```

You can be free to use any email service that supports SMTP protocol (e.g.: [sendgrid](https://sendgrid.com/) or [mailgun](https://www.mailgun.com/)).

## Uploading Files

You should update the `UPLOADS_PATH` environment variable to be able to upload files:
```shell
UPLOADS_PATH=resources/uploads
```

For running the tests, you should set the same environment variable (with a differente value) in the `.env.testing` file:
```
UPLOADS_PATH=resources/uploads-testing
```

## Adonis Framework

This project was bootstrapped by using the [Adonis Framework](https://adonisjs.com/docs/4.1/installation).