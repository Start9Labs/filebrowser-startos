FROM alpine:latest

RUN apk update
RUN apk add --no-cache lighttpd
RUN apk add --no-cache -X http://dl-cdn.alpinelinux.org/alpine/edge/testing catatonit
RUN apk add --no-cache coreutils
RUN apk add --no-cache curl \
    && curl -fsSL "https://github.com/filebrowser/filebrowser/releases/download/v2.6.2/linux-armv7-filebrowser.tar.gz" -o "/tmp/filebrowser.tar.gz" \
    && tar -xzf "/tmp/filebrowser.tar.gz" -C "/tmp/" "filebrowser" \
    && chmod +x "/tmp/filebrowser" \
    && mv /tmp/filebrowser /usr/local/bin \
    && apk del curl
RUN mkdir /root/data
WORKDIR /root

ADD httpd.conf /etc/lighttpd/httpd.conf
ADD docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
RUN chmod +x /usr/local/bin/docker_entrypoint.sh

ENTRYPOINT ["/usr/local/bin/docker_entrypoint.sh"]
