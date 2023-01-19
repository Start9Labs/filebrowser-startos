PKG_VERSION := $(shell yq e ".version" manifest.yaml)
PKG_ID := $(shell yq e ".id" manifest.yaml)
FILEBROWSER_SRC := $(shell find filebrowser -name '*.go') $(shell find filebrowser -name 'go.*')
FILEBROWSER_FRONTEND_SRC := $(shell find filebrowser/frontend -type d \( -path filebrowser/frontend/dist -o -path filebrowser/frontend/node_modules \) -prune -o -name '*' -print)

# delete the target of a rule if it has changed and its recipe exits with a nonzero exit status
.DELETE_ON_ERROR:

all: verify

# assumes /etc/embassy/config.yaml exists on local system with `host: "http://embassy-server-name.local"` configured
install: $(PKG_ID).s9pk
	embassy-cli package install $(PKG_ID).s9pk

verify: $(PKG_ID).s9pk
	embassy-sdk verify s9pk $(PKG_ID).s9pk

clean:
	rm -rf docker-images
	rm -f  $(PKG_ID).s9pk
	rm -f image.tar
	rm -f scripts/*.js

$(PKG_ID).s9pk: manifest.yaml instructions.md LICENSE icon.png scripts/embassy.js docker-images/aarch64.tar docker-images/x86_64.tar
	
	embassy-sdk pack

docker-images/aarch64.tar: Dockerfile docker_entrypoint.sh httpd.conf $(FILEBROWSER_SRC) filebrowser/frontend/dist
	mkdir -p docker-images
	DOCKER_CLI_EXPERIMENTAL=enabled docker buildx build --tag start9/$(PKG_ID)/main:${PKG_VERSION} --platform=linux/arm64/v8 -o type=docker,dest=docker-images/aarch64.tar .

docker-images/x86_64.tar: Dockerfile docker_entrypoint.sh httpd.conf $(FILEBROWSER_SRC) filebrowser/frontend/dist
	mkdir -p docker-images
	DOCKER_CLI_EXPERIMENTAL=enabled docker buildx build --tag start9/$(PKG_ID)/main:${PKG_VERSION} --platform=linux/amd64 -o type=docker,dest=docker-images/x86_64.tar .

httpd.conf: manifest.yaml httpd.conf.template
	tiny-tmpl manifest.yaml < httpd.conf.template > httpd.conf

filebrowser/frontend/dist: $(FILEBROWSER_FRONTEND_SRC) filebrowser/frontend/node_modules
	NODE_OPTIONS='--openssl-legacy-provider' npm --prefix filebrowser/frontend run build

filebrowser/frontend/node_modules: filebrowser/frontend/package.json filebrowser/frontend/package-lock.json
	npm --prefix filebrowser/frontend install

manifest.yaml: $(FILEBROWSER_GIT_FILE)
	yq eval -i ".version = \"$(VERSION)\"" manifest.yaml
	yq eval -i ".release-notes = \"https://github.com/filebrowser/filebrowser/releases/tag/$(VERSION_TAG)\"" manifest.yaml

scripts/embassy.js: $(TS_FILES) scripts/generated/manifest.ts
	deno bundle scripts/embassy.ts scripts/embassy.js

scripts/generated/manifest.ts: manifest.yaml scripts/generateManifest.ts
	mkdir -p scripts/generated
	deno run --allow-write --allow-read scripts/generateManifest.ts