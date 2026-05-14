# File Browser

File Browser is a web-based file manager: upload, download, organize, edit, and share files from your browser. It supports multiple users with their own scoped directories.

## Documentation

- [File Browser upstream docs](https://github.com/filebrowser/filebrowser/tree/master/www/docs) — the upstream guide covering the UI, settings, sharing, and admin features.

## What you get on StartOS

- A **Web UI** interface at port `8080` for managing files.
- Storage on the `data` volume (mounted at `/srv`) — this is the root directory File Browser browses.
- A SQLite database on the `database` volume for user accounts, shares, and settings.

## Getting set up

The default upstream `admin/admin` credentials are not used. After install, generate secure credentials before logging in.

1. Run the **Set Admin Password** action while File Browser is stopped. It creates the `admin` user (if needed) and prints a randomly generated password — copy it before dismissing the output.
2. Start File Browser.
3. Open the **Web UI** interface and sign in with username `admin` and the password from step 1.

If you lose the password, run **Set Admin Password** again to rotate it.

## Actions

- **Set Admin Password** — create or reset the `admin` account. Only available when the service is stopped.
- **Set Session Timeout** — change how long a browser session stays signed in (in hours, minimum 1; default 12).

## Limitations

- The browsable root is fixed at `/srv` (the `data` volume) and cannot be changed.
- The admin username is fixed as `admin`; only its password is configurable.
- Custom branding, proxy/header authentication, and the upstream "Commands" feature are not exposed by this package.
