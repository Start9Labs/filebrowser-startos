FROM filebrowser/filebrowser:v2.25.0
#FROM golang:alpine3.13 AS builder

#RUN apk update
#RUN apk add --no-cache git
#RUN go get github.com/GeertJohan/go.rice \
# && go get github.com/GeertJohan/go.rice/rice
#ADD ./filebrowser /root/filebrowser

#WORKDIR /root/filebrowser

#RUN go mod download
#RUN cd http && rice embed-go
#RUN go build

#FROM alpine:3.18 AS runner

#RUN apk update
#RUN apk add --no-cache tini
# RUN apk add --no-cache lighttpd
# RUN apk add --no-cache coreutils
# RUN apk add --no-cache curl
#COPY --from=builder /root/filebrowser/filebrowser /usr/local/bin/filebrowser
#RUN mkdir /root/data
WORKDIR /root

# ADD httpd.conf /etc/lighttpd/httpd.conf
COPY --chmod=755 docker_entrypoint.sh /usr/local/bin/
COPY --chmod=755 health-check.sh /usr/local/bin/
RUN ln -s /filebrowser /usr/local/bin/

# ENTRYPOINT ["/usr/local/bin/docker_entrypoint.sh"]
