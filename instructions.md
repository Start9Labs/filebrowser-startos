# File Browser

> **File Browser is no longer maintained.** Its developers have stopped work
> on it: there will be no further releases and no security fixes. Your files
> are safe and you can keep using it, but you should plan to move. See
> [Moving to something maintained](#moving-to-something-maintained).

## Documentation

- [File Browser documentation](https://github.com/filebrowser/filebrowser/tree/master/docs) — upstream guide covering installation, configuration, authentication, customization, and the CLI.

## What you get on StartOS

- A **Web UI** for browsing, uploading, downloading, editing, and sharing files stored on your server.
- A persistent file storage volume mounted at `/srv` inside the container — this is the root that File Browser browses.
- Multi-user support with per-user permissions and shareable links, all managed through the Web UI.

## Getting set up

File Browser posts critical tasks after install. You can't start the service until they are done.

1. Run the **End of Life Notice** task. It explains that File Browser is no longer maintained and points you at its replacement; tick the box to confirm you've read it. You are only asked once.
2. Run the **Set Admin Password** task. A username (`admin`) and a randomly generated password are shown once — copy and save the password before dismissing. If you lose it, run the **Set Admin Password** action again later to generate a new one.
3. Start File Browser and open the **Web UI**. Log in with `admin` and the password from the previous step.

## Using File Browser

### Web UI

The Web UI is where all day-to-day file management happens — upload, download, rename, move, delete, preview, edit, and share files. Create additional user accounts and assign permissions from the settings menu inside the UI.

### Actions

- **Set Admin Password** — generates a new random password for the `admin` user. Use it to rotate credentials or recover from a lost password. File Browser must be stopped to run this action.
- **Set Session Timeout** — sets how many hours a logged-in browser session lasts before it is automatically terminated. Defaults to 12 hours; minimum is 1.
- **End of Life Notice** — confirms you've read that File Browser is no longer maintained. You only see this once; it does not come back.

You will also see a **Maintenance Status** health check that always shows red. That is deliberate — it is a standing reminder that this service is no longer maintained, not a fault. File Browser itself is working normally as long as **Web Interface** is green.

## Moving to something maintained

**FileBrowser Quantum** is the replacement — it is the same project, picked up and maintained by a different developer, so it works the way you are used to and keeps your files on your own server. You will find it on this same marketplace listing: open File Browser in the marketplace and switch the flavor. Switching keeps your files, your user accounts, and everyone's existing passwords.

**The switch is permanent.** File Browser will not take your data back afterwards, so restoring a backup taken beforehand is the only way to return. Two other things do **not** survive the switch, so read this before you do it:

- **Per-user folder restrictions are lost.** If you gave someone an account limited to one folder, after switching they will be able to see everything. Re-check every account that isn't yours and set its folder again.
- **Existing share links stop working.** Any link you handed out will need to be re-created.

**Back up File Browser first** from the StartOS backup screen. Your files themselves need no moving: Quantum reuses the same storage.
