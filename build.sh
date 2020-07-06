#!/usr/bin/env bash

cd server
npm install
npm run build-prod

cd ../client
npm install
npm run build

cd ..
cp -a ./client/build/. ./server/build/public/