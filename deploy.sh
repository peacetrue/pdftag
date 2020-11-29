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

# scp $ali_ssh:/root/peacetrue/pdftag/02-output/template-0.pdf ./
# scp docs/antora/modules/ROOT/attachment/Fonts.zip $ali_ssh:/root/peacetrue/pdftag/
