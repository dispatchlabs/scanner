#!/usr/bin/env bash

if [ "$1" = "" ] ; then
   echo "usage: ./release.sh environment (dev, qa, aws)"
else
    rm -rf dist
    rm -rf node_modules
    npm i
    npm run build:$1
    zip -r -X outside-web.zip ./dist ./server.js ./package.json
    rm -rf ~/Deploy/outside-dist.zip
    cp outside-web.zip ~/Deploy
    rm outside-web.zip
    rm -rf dist
    cd ~/Deploy
fi