FROM filebrowser/filebrowser:v2.31.2

WORKDIR /root

COPY --chmod=755 docker_entrypoint.sh /usr/local/bin/
RUN sed -i -e 's|"port": 80,|"port": 8080,|' -e 's|"database": "/database.db"| "database": "/root/filebrowser.db"|' -e 's|"root": "/srv"| "root": "/root/data"|' /.filebrowser.json
RUN ln -s /filebrowser /usr/local/bin/
