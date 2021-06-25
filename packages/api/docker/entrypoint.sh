#!/bin/sh

npm run migration:run -- --force
npm run seed:default --force
npm run algolia:index
npm run apidoc

npm run start