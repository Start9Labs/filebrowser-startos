FROM arm32v7/golang:alpine AS builder

RUN apk update
RUN apk add --no-cache git
RUN go get github.com/GeertJohan/go.rice \
 && go get github.com/GeertJohan/go.rice/rice
ADD ./filebrowser /root/filebrowser

WORKDIR /root/filebrowser

RUN go mod download
RUN cd http && rice embed-go
RUN go build

FROM arm32v7/alpine:latest AS runner

RUN apk update
RUN apk add --no-cache lighttpd
RUN apk add --no-cache -X http://dl-cdn.alpinelinux.org/alpine/edge/testing catatonit
RUN apk add --no-cache coreutils
COPY --from=builder /root/filebrowser/filebrowser /usr/local/bin/filebrowser
RUN mkdir /root/data
WORKDIR /root

ADD httpd.conf /etc/lighttpd/httpd.conf
ADD docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
RUN chmod +x /usr/local/bin/docker_entrypoint.sh

ENTRYPOINT ["/usr/local/bin/docker_entrypoint.sh"]
