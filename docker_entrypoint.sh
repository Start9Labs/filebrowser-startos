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
    echo '    description: ~' >> /root/start9/stats.yaml
    echo '    copyable: true' >> /root/start9/stats.yaml
    echo '    masked: true' >> /root/start9/stats.yaml
    echo '    qr: false' >> /root/start9/stats.yaml
    echo '  - name: Default Password' >> /root/start9/stats.yaml
    echo '    value: "'"$password"'"' >> /root/start9/stats.yaml
    echo '    description: This is your randomly-generated, default password. While we DO NOT recommend changing it, you may do so inside your File Browser web application, but that change will not be reflected here. If you change the default password and forget your new password, there is no way to regain access.' >> /root/start9/stats.yaml
    echo '    copyable: true' >> /root/start9/stats.yaml
    echo '    qr: false' >> /root/start9/stats.yaml
    filebrowser users add admin $password --perm.admin=true
fi

lighttpd -f /etc/lighttpd/httpd.conf

exec tini -- filebrowser --disable-exec=true
