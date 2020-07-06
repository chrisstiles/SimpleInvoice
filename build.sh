#!/usr/bin/env bash

cd server
npm install
npm run build-prod
cd build npm ci --production

cd ../../client
npm install
npm run build

cd ..
cp -a ./client/build/. ./server/build/public/