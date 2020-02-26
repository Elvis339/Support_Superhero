#!/bin/bash

BUILD="$PWD/client/build/"
MODULES="$PWD/node_modules"

echo "Set NODE_ENV production or development"
read -p 'SET ENV: ' environment

if [ "$environment" == "production" ]; then
    if [ ! -d "$BUILD" ]; then
      echo "Building frontend in ${BUILD}... 👷‍♂️"
      npm run build_frontend
    else
      rm -rf $BUILD
      echo "Updating frontend... 🚧"
      npm run build_frontend
    fi
  echo "----- FRONTEND BUILT & MODULES INSTALLED -----"

  export PORT=3000
  echo "PORT is set to 3000 🚢"

  export NODE_ENV=production
  echo "NODE_ENV is set to production 🎬"

  node_modules/pm2/bin/pm2 start index.js
  echo "pm2 started index.js"
else
  export PORT=3001
  echo "PORT is set to 3001 🚢"

  export NODE_ENV=development
  echo "NODE_ENV is set to development 🚦"

  npm run dev
  echo "Started in development mode..."
fi