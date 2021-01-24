#!/bin/sh

if [ ! -f /root/filebrowser.db ]; then
    mkdir /root/www
    mkdir /root/data
    filebrowser config init
    filebrowser config set --address=0.0.0.0 --port=8080 --root=/root/data
    password=$(cat /dev/urandom | base64 | head -c 16)
    echo 'version: 1' > /root/start9/stats.yaml
    echo 'data:' >> /root/start9/stats.yaml
    echo '  - name: Default Username' >> /root/start9/stats.yaml
    echo '    value: admin' >> /root/start9/stats.yaml
    echo '    description: This is your default username. While it is not necessary, you may change it inside your File Browser web application. That change, however, will not be reflected here. If you change your default username and forget your new username, there is no way to regain access.' >> /root/start9/stats.yaml
    echo '    copyable: true' >> /root/start9/stats.yaml
    echo '    qr: false' >> /root/start9/stats.yaml
    echo '  - name: Default Password' >> /root/start9/stats.yaml
    echo '    value: "'"$password"'"' >> /root/start9/stats.yaml
    echo '    description: This is your randomly-generated, default password. While it is not necessary, you may change it inside your File Browser web application. That change, however, will not be reflected here. If you change your default password and forget your new password, there is no way to regain access.' >> /root/start9/stats.yaml
    echo '    copyable: true' >> /root/start9/stats.yaml
    echo '    masked: true' >> /root/start9/stats.yaml
    echo '    qr: false' >> /root/start9/stats.yaml
    filebrowser users add admin $password --perm.admin=true
fi

lighttpd -f /etc/lighttpd/httpd.conf

exec tini -- filebrowser --disable-exec=true
