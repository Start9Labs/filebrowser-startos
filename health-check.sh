#!/bin/sh

check_api(){
    filebrowser version &>/dev/null
    echo $? > /root/health-api
}


while true ; do
    check_api
    sleep 60
done