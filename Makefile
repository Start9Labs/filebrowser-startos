VERSION_TAG := $(shell git --git-dir=filebrowser/.git describe --abbrev=0)
VERSION := $(VERSION_TAG:v%=%)
EMVER := $(shell yq e ".version" manifest.yaml)
FILEBROWSER_SRC := $(shell find filebrowser -name '*.go') $(shell find filebrowser -name 'go.*')
FILEBROWSER_FRONTEND_SRC := $(shell find filebrowser/frontend -type d \( -path filebrowser/frontend/dist -o -path filebrowser/frontend/node_modules \) -prune -o -name '*' -print)
FILEBROWSER_GIT_REF := $(shell cat .git/modules/filebrowser/HEAD)
FILEBROWSER_GIT_FILE := $(addprefix .git/modules/filebrowser/,$(if $(filter ref:%,$(FILEBROWSER_GIT_REF)),$(lastword $(FILEBROWSER_GIT_REF)),HEAD))

.DELETE_ON_ERROR:

all: verify

install: filebrowser.s9pk
	embassy-cli package install filebrowser.s9pk

filebrowser.s9pk: manifest.yaml image.tar instructions.md LICENSE icon.png $(ASSET_PATHS)
	embassy-sdk pack
	
verify: filebrowser.s9pk
	embassy-sdk verify filebrowser.s9pk

image.tar: Dockerfile docker_entrypoint.sh httpd.conf $(FILEBROWSER_SRC) filebrowser/frontend/dist
	DOCKER_CLI_EXPERIMENTAL=enabled docker buildx build --tag start9/filebrowser/main:${EMVER} --platform=linux/arm64/v8 -o type=docker,dest=image.tar .

httpd.conf: manifest.yaml httpd.conf.template
	tiny-tmpl manifest.yaml < httpd.conf.template > httpd.conf

filebrowser/frontend/dist: $(FILEBROWSER_FRONTEND_SRC) filebrowser/frontend/node_modules
	npm --prefix filebrowser/frontend run build

filebrowser/frontend/node_modules: filebrowser/frontend/package.json filebrowser/frontend/package-lock.json
	npm --prefix filebrowser/frontend install

manifest.yaml: $(FILEBROWSER_GIT_FILE)
	yq eval -i ".version = \"$(VERSION)\"" manifest.yaml
	yq eval -i ".release-notes = \"https://github.com/filebrowser/filebrowser/releases/tag/$(VERSION_TAG)\"" manifest.yaml
