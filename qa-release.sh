#!/usr/bin/env bash

rm -rf dist
npm run build:qa
cp ./src/app/m2-angular/server/m2-server.js .
zip -r -X change-me-web.zip ./dist ./m2-server.js ./package.json
rm -rf ~/Deploy/change-me-dist.zip
cp change-me-web.zip ~/Deploy
rm change-me-web.zip
rm -rf dist
cd ~/Deploy