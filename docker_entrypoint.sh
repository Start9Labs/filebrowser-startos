#!/bin/sh

if [ ! -f /root/filebrowser.db ]; then
    filebrowser config init
    filebrowser config set --address 0.0.0.0 --port 80 --perm.execute=false --root /root/data --shell /bin/sh
    filebrowser users add admin admin --perm.admin=true
fi

filebrowser users update admin --password $(ry start9/config.yaml password)

exec catatonit filebrowser
