
FROM alpine:latest AS runner

RUN apk update
RUN apk add --no-cache tini
RUN apk add --no-cache lighttpd
RUN apk add --no-cache coreutils
RUN apk add --no-cache curl
RUN apk add --no-cache wget
RUN apk add --no-cache tar
ARG PLATFORM
RUN wget -qO /filebrowser.tar.gz https://github.com/filebrowser/filebrowser/releases/download/v2.23.0/linux-${PLATFORM}-filebrowser.tar.gz
RUN mkdir /filebrowser
RUN tar -zxvf /filebrowser.tar.gz -C /filebrowser
RUN mv /filebrowser/filebrowser /usr/local/bin/filebrowser
RUN rm -rf /filebrowser.tar.gz /filebrowser
RUN mkdir /root/data
WORKDIR /root

ADD httpd.conf /etc/lighttpd/httpd.conf
ADD docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
RUN chmod +x /usr/local/bin/docker_entrypoint.sh
ADD ./health-check.sh /usr/local/bin/health-check.sh
RUN chmod +x /usr/local/bin/health-check.sh

ENTRYPOINT ["/usr/local/bin/docker_entrypoint.sh"]
