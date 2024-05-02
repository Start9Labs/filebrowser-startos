FROM filebrowser/filebrowser:v2.29.0

WORKDIR /root

COPY --chmod=755 docker_entrypoint.sh /usr/local/bin/
RUN sed -i 's/"port": 80,/"port": 8080,/' /.filebrowser.json
RUN ln -s /filebrowser /usr/local/bin/
