FROM filebrowser/filebrowser:v2.25.0

WORKDIR /root

COPY --chmod=755 docker_entrypoint.sh /usr/local/bin/
RUN ln -s /filebrowser /usr/local/bin/
