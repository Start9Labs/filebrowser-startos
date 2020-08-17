#!/bin/sh

if [ ! -f /root/filebrowser.db ]; then
    mkdir /root/www
    mkdir /root/data
    filebrowser config init
    filebrowser config set --address 0.0.0.0 --port 8080 --perm.execute=false --root /root/data --shell /bin/sh
    password=$(cat /dev/urandom | base64 | head -c 12)
    echo '"Default Username": admin' > /root/start9/stats.yaml
    echo '"Default Password": '"$password" >> /root/start9/stats.yaml
    filebrowser users add admin $password --perm.admin=true
fi

lighttpd -f /etc/lighttpd/httpd.conf

exec catatonit filebrowser
