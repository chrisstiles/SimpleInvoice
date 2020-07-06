#!/usr/bin/env bash

npm run build-prod --prefix server
npm run build --prefix client
cp -a ./client/build/. ./server/build/public/