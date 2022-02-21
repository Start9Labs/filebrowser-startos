#!/bin/sh

check_api(){
    DURATION=$(</dev/stdin)
    if (($DURATION <= 5000 )); then 
        exit 60
    else
        filebrowser version &>/dev/null
        RES=$?
        if test "$RES" != 0; then
            echo "API unreachable" >&2
            exit 1
        fi
    fi
}

check_web(){
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
}

case "$1" in
	api)
        check_api
        ;;
	web)
        check_web
        ;;
    *)
        echo "Usage: $0 [command]"
        echo
        echo "Commands:"
        echo "         api"
        echo "         web"
esac