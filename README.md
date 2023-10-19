<p align="center">
  <img src="icon.png" alt="Project Logo" width="21%">
</p>

# Wrapper for filebrowser

[File Browser](https://github.com/filebrowser/filebrowser) provides a simple
file managing interface which can be used to upload, download, organize, edit,
and share your files. It allows the creation of multiple users and each user can
have their own directory. This repository creates the `s9pk` package that is
installed to run `filebrowser` on [StartOS](https://github.com/Start9Labs/start-os/).

## Dependencies

Prior to building the `filebrowser` package, it's essential to configure your build environment for StartOS services. You can find instructions on how to set up the appropriate build environment in the [Developer Docs](https://docs.start9.com/latest/developer-docs/packaging).

- [docker](https://docs.docker.com/get-docker)
- [docker-buildx](https://docs.docker.com/buildx/working-with-buildx/)
- [deno](https://deno.land/#installation)
- [make](https://www.gnu.org/software/make/)
- [start-sdk](https://github.com/Start9Labs/start-os/tree/sdk/backend)
- [yq](https://mikefarah.gitbook.io/yq)

## Cloning

Clone the File Browser Wrapper locally.

```
git clone git@github.com:Start9Labs/filebrowser-wrapper.git
cd filebrowser-wrapper
```

## Building

To build the **File Browser** service as a universal package, run the following command:

```
make
```

Alternatively the package can be built for individual architectures by specifying the architecture as follows:

```
make x86
```

or

```
make arm
```

## Installing (on StartOS)

Run the following commands to determine successful install:

> :information_source: Change server-name.local to your Start9 server address

```
start-cli auth login
#Enter your StartOS password
start-cli --host https://server-name.local package install filebrowser.s9pk
```

**Tip:** You can also install the filebrowser.s9pk using **Sideload Service** under the **StartOS > SETTINGS** section.

## Verify Install

Go to your StartOS Services page, select **File Browser**, configure and start the service.

**Done!**
