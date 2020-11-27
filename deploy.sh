#!/bin/bash

#env=${1}

rm -rf pdftag-app/src/main/resources/public
cd pdftag-react-admin || exit
yarn build
mv ./build ../pdftag-app/src/main/resources/public

cd ../
./gradlew clean
./gradlew bootJar

scp pdftag-app/build/libs/pdftag-app-1.0.0-SNAPSHOT.jar $ali_ssh:/root/peacetrue/pdftag
