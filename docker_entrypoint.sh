#!/bin/sh

_term() {
    echo "Caught SIGTERM signal!"
    kill -TERM "$filebrowser_process" 2>/dev/null
}

init_config() {
    mkdir -p /root/start9 /root/data
    filebrowser config init
    password=$(cat /dev/urandom | base64 | head -c 16)
    cat >/root/start9/stats.yaml <<EOF
version: 2
data:
  Default Username:
    type: string
    value: admin
    description: This is your default username. While it is not necessary, you may change it inside your File Browser web application. That change, however, will not be reflected here. If you change your default username and forget your new username, you can regain access by resetting the root user.
    copyable: true
    masked: false
    qr: false
  Default Password:
    type: string
    value: "$password"
    description: This is your randomly-generated, default password. While it is not necessary, you may change it inside your File Browser web application. That change, however, will not be reflected here.
    copyable: true
    masked: true
    qr: false
EOF
    filebrowser users add admin "$password" --perm.admin=true
}

reset_root_pass() {
    password=$(cat /dev/urandom | base64 | head -c 16)
    sed -i '/Default Password:/,/qr: false/s/value: .*/value: "'"$password"'"/' /root/start9/stats.yaml
    filebrowser users update 1 -u admin -p "$password" --perm.admin >/dev/null
    echo "{
    \"version\": \"0\",
    \"message\": \"Here is your new password. This will also be reflected in the Properties page for this service.\",
    \"value\": \"$password\",
    \"copyable\": true,
    \"qr\": false
  }"
    exit 0
}

[ ! -f /root/filebrowser.db ] && init_config
[ "$1" = "reset-root-user" ] && reset_root_pass

userTimeout=$(cat /root/start9/config.yaml | grep userTimeout | awk '{print $2}')

filebrowser config set --address=0.0.0.0 --port=8080 --root=/root/data --token-expiration-time=${userTimeout}h
filebrowser &
filebrowser_process=$1

printf "\n\n [i] Starting File Browser ...\n\n"

trap _term SIGTERM

wait -n $filebrowser_process
