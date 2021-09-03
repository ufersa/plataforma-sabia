# Sabiá API

## Table of Contents

- [Running the API Server](#running-the-api-server)
- [Running the Tests](#running-the-tests)
- [API Documentation](#api-documentation)
- [Using Fake Values](#using-fake-values)
- [Pushing the Data to Algolia](#pushing-the-data-to-algolia)
- [Sending Emails](#sending-emails)
- [Queue Manager](#queue-manager)
- [Adonis Framework](#adonis-framework)

## Running the API Server

1. Copy the `.env.example` file to `.env` and update all of the environment variables correctly.
2. Make sure you have a MySQL database server (feel free to use docker or whatever method you prefer) up and running and update the `DB_HOST`, `DB_PORT`, `DB_USER` and `DB_PASSWORD` environment variables.
3. Run the migrations in order to create the tables:

```sh
npm run migration:run
```

4. Fill the database with the default values:

If you prefer, you can [use fake values](#using-fake-values) in order to fill your application database.

**Do not run the default seed command if you prefer to use fake values**

```sh
npm run seed:default
```

5. Make sure the `APP_KEY` variable has been filled in the `.env` file (you can run `npx adonis key:generate` if you want).
6. Start the server: `npm start` (`npm run dev` for develop mode).
7. The API server will be available at `http://127.0.0.1:3333`.

## Running the Tests

After updating the environment variables in the `.env.testing` file, run:

```sh
npm run test
```

If you want to take a look at the code coverage, run:

```sh
npm run coverage
```

**The API server will use `DB_USER` and `DB_PASSWORD` values set in the `.env` file in order to connect to the testing database server.**

## API Documentation

This project has been documented by using [apiDoc](https://apidocjs.com/). Use the following script to generate/update the documentation:

```sh
npm run apidoc
```

After generating the documentation files, you can start the API server and visit `http://localhost:3333/docs` to see the documentation.

## Using Fake Values

**If you ran the default seed script before, you will receive an error when running the following script. Reset the database before running this script**

You can fill the database with fake values for testing purposes:

1. Set the [Algolia config](#pushing-the-data-to-algolia).
2. Run the following script:

```sh
npm run seed
```

## Pushing the Data to Algolia

In order to use Algolia, you should create an account on the [Algolia website](https://www.algolia) (there is a free account option) and set the `ALGOLIA_APP_ID` (Application ID) and `ALGOLIA_ADMIN_KEY` (Admin API) variables.

The algolia index name prefix is `searchable` by default, but you can replace it by setting a new `ALGOLIA_INDEX_PREFIX` variable value. Remember to update the index name prefix in web package too. Otherwise it will fail to search.

Before running the API server, you should push all of the database data to algolia by running the following command:

```sh
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

Feel free to use any email service that supports SMTP protocol (e.g.: [sendgrid](https://sendgrid.com/), [mailgun](https://www.mailgun.com/) or even [gmail](https://www.google.com/intl/pt/gmail/about/#)).

## Queue Manager

This project uses [Bull](https://www.npmjs.com/package/bull) for queue manager. Make sure you have a Redis server (feel free to use docker or whatever method you prefer) up and running. Bull will by default try to connect to a Redis server running on localhost:6379. For development purposes it is possible monitoriing the queue using Bull Board dashboard. In `http://localhost:9999`.

## Analytics

In order to use Google Analytics integration, you should update the following environment variables:

```
GA_CLIENT_EMAIL=
GA_PRIVATE_KEY=
GA_VIEW_ID_SITE=
GA_VIEW_ID_BLOG=
```
The `GA_CLIENT_EMAIL` and` GA_PRIVATE_KEY` keys are used for Google Analytics authentication. They can be found in the [Google API Console](https://console.developers.google.com/) in the credentials menu.
- `GA_CLIENT_EMAIL` is a Google service account for the Google project of the platform you knew.
- `GA_PRIVATE_KEY` is found in the downloaded file` .json`.
- `GA_VIEW_ID_SITE` and` GA_VIEW_ID_BLOG` are a view ID. They are found on the [Google Analytics website](https://analytics.google.com/), in the preview section.

## Adonis Framework

This project was bootstrapped by using the [Adonis Framework](https://adonisjs.com/docs/4.1/installation).
