#!/bin/bash

BUILD="$PWD/client/build/"
MODULES="$PWD/node_modules"

if [ ! -d "$MODULES" ]; then
    echo "Installing modules in ${MODULES} ⚙️⚙️⚙️"
    npm install && cd $PWD/client && npm install && cd ..
fi

echo "Do you want to set application to production? y/n"
read -p 'y/n: ' environment

if [ "$environment" = "y" ] 
then
  if [ ! -d "$BUILD" ]; then
    echo "Building frontend in ${BUILD}... 👷‍♂️"
    npm run build_frontend
  else
    rm -rf $BUILD
    echo "Updating frontend... 🚧"
    npm run build_frontend
  fi
  echo "----- FRONTEND BUILT ⚒ -----"
  export NODE_ENV=production
  export PORT=3000
  echo "NODE_ENV production | PORT 3000"
fi