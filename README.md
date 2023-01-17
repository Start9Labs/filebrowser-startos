# Wrapper for filebrowser

[File Browser](https://github.com/filebrowser/filebrowser) provides a simple file managing interface which can be used to upload, download, organize, edit, and share your files. It allows the creation of multiple users and each user can have their own directory. This repository creates the `s9pk` package that is installed to run `filebrowser` on [embassyOS](https://github.com/Start9Labs/embassy-os/).

## Dependencies

Install the following system dependencies to build this project by following the instructions in the provided links. You can also find detailed steps to setup your environment in the service packaging [documentation](https://github.com/Start9Labs/service-pipeline#development-environment).

- [docker](https://docs.docker.com/get-docker)
- [docker-buildx](https://docs.docker.com/buildx/working-with-buildx/)
- [yq](https://mikefarah.gitbook.io/yq)
- [tiny-tmpl](https://github.com/Start9Labs/templating-engine-rs.git)
- [npm](https://www.npmjs.com/get-npm)
- [make](https://www.gnu.org/software/make/)
- [embassy-sdk](https://github.com/Start9Labs/embassy-os/tree/master/backend)
- [deno](https://deno.land/#installation)

## Cloning

Clone the File Browser Wrapper locally. Note the submodule link to the original project.

```
git clone git@github.com:Start9Labs/filebrowser-wrapper.git
cd filebrowser-wrapper
git submodule update --init
```

## Building

To build the `filebrowser` package, run the following command:

```
make
```

## Installing (on embassyOS)

Run the following commands to install:

> :information_source: Change embassy-server-name.local to your Embassy address

```
embassy-cli auth login
# Enter your embassy password
embassy-cli --host https://embassy-server-name.local package install filebrowser.s9pk
```

If you already have your `embassy-cli` config file setup with a default `host`,
you can install simply by running:

```
make install
```

> **Tip:** You can also install the filebrowser.s9pk using **Sideload Service** under
> the **Embassy > Settings** section.

### Verify Install

Go to your Embassy Services page, select **File Browser**, configure and start the service. Then, verify its interfaces are accessible.

**Done!**
