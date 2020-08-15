#!/bin/bash

docker build --tag start9/filebrowser .
docker save start9/filebrowser > image.tar
docker rmi start9/filebrowser
appmgr -vv pack $(pwd) -o filebrowser.s9pk
