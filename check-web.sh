#!/bin/sh

DURATION=$(</dev/stdin)
if (($DURATION <= 10000 )); then
    exit 60
else
    curl --silent --fail filebrowser.embassy/health &>/dev/null
    RES=$?
    if test "$RES" != 0; then
        echo "Web interface is unreachable" >&2
        exit 1
    fi
fi