#!/bin/sh

check_api(){
    filebrowser version &>/dev/null
    echo $? > /root/health-api
}

check_web(){
    curl --silent --fail filebrowser.embassy/health &>/dev/null
    echo $? > /root/health-web
}


while true ; do
    check_web
    check_api
    sleep 60
done