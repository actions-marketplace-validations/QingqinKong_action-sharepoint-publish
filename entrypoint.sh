#!/bin/sh -l

echo "Creating archive";
# mkdir /out
cd $GITHUB_WORKSPACE
ls
# zip -r /out/repoarchive.zip ./* -x .git/*
export FILE_PATH='android/app/build/outputs/apk/release/app-release-signed.apk'

node /app/index.js
[ $? -eq 0 ]  || exit 1

