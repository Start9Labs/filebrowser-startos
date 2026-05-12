# File Browser

## Documentation

- [File Browser documentation](https://github.com/filebrowser/filebrowser/tree/master/www/docs) — upstream guide covering features, permissions, sharing, and configuration.

## What you get on StartOS

- A **Web UI** for browsing, uploading, downloading, editing, and sharing files stored on your server.
- A persistent file storage volume mounted at `/srv` inside the container — this is the root that File Browser browses.
- Multi-user support with per-user permissions and shareable links, all managed through the Web UI.

## Getting set up

File Browser posts a critical task after install. You can't start the service until it is done.

1. Run the **Set Admin Password** task. A username (`admin`) and a randomly generated password are shown once — copy and save the password before dismissing. If you lose it, run the **Set Admin Password** action again later to generate a new one.
2. Start File Browser and open the **Web UI**. Log in with `admin` and the password from the previous step.

## Using File Browser

### Web UI

The Web UI is where all day-to-day file management happens — upload, download, rename, move, delete, preview, edit, and share files. Create additional user accounts and assign permissions from the settings menu inside the UI.

### Actions

- **Set Admin Password** — generates a new random password for the `admin` user. Use it to rotate credentials or recover from a lost password. File Browser must be stopped to run this action.
- **Set Session Timeout** — sets how many hours a logged-in browser session lasts before it is automatically terminated. Defaults to 12 hours; minimum is 1.
