FROM golang:alpine3.13 AS builder

RUN apk update
RUN apk add --no-cache git
RUN go get github.com/GeertJohan/go.rice \
 && go get github.com/GeertJohan/go.rice/rice
ADD ./filebrowser /root/filebrowser

WORKDIR /root/filebrowser

RUN go mod download
RUN cd http && rice embed-go
RUN go build

FROM alpine:latest AS runner

RUN apk update
RUN apk add --no-cache tini
RUN apk add --no-cache lighttpd
RUN apk add --no-cache coreutils
RUN apk add --no-cache curl
COPY --from=builder /root/filebrowser/filebrowser /usr/local/bin/filebrowser
RUN mkdir /root/data
WORKDIR /root

ADD httpd.conf /etc/lighttpd/httpd.conf
ADD docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
RUN chmod +x /usr/local/bin/docker_entrypoint.sh
ADD ./health-check.sh /usr/local/bin/health-check.sh
RUN chmod +x /usr/local/bin/health-check.sh

ENTRYPOINT ["/usr/local/bin/docker_entrypoint.sh"]
