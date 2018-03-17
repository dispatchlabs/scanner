#!/usr/bin/env bash

if [ "$1" = "" ] ; then
   echo "usage: ./release.sh environment (dev, dispatch)"
else
    rm -rf dist
    rm -rf node_modules
    npm i
    npm run build:$1
    cp ./src/app/m2-angular/server/m2-server.js .
    zip -r -X dispatch-web.zip ./dist ./m2-server.js ./package.json
    rm -rf ~/Deploy/dispatch-dist.zip
    cp dispatch-web.zip ~/Deploy
    rm dispatch-web.zip
    rm -rf dist
    cd ~/Deploy
fi





