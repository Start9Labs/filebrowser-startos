<p align="center">
  <img src="icon.svg" alt="File Browser Logo" width="21%">
</p>

# File Browser on StartOS

> Everything not listed in this document should behave the same as upstream
> File Browser. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

> [!IMPORTANT]
> **File Browser is no longer maintained upstream.** 2.63.23 is the final
> release and the repository is being archived; there will be no further
> releases and no security fixes. This package blocks startup behind a
> one-time acknowledgement and reports a standing health-check failure as an
> ongoing reminder. See [End of Life](#end-of-life).

[File Browser](https://github.com/filebrowser/filebrowser) is a web file manager for a single directory tree. On StartOS its files, its database, and its configuration live on three separate volumes, and the admin account is created during install rather than through a first-run screen.

- **Upstream repo:** <https://github.com/filebrowser/filebrowser>
- **Wrapper repo:** <https://github.com/Start9Labs/filebrowser-startos>

---

## Table of Contents

- [End of Life](#end-of-life)
- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## End of Life

Upstream ended the project. The package still works, but it is a dead end, and it says so in four places: the title carries `(unsupported)`, the marketplace description leads with the wind-down, a `critical` task blocks startup until the user acknowledges, and a health check reports failure permanently.

The title and description are the only two a _prospective_ user sees. Neither reaches a dependent's Dependencies card while File Browser is uninstalled — that card falls back to the title and icon frozen into the _dependent's_ own s9pk at pack time, and all eight hard-code `File Browser`.

The `end-of-life` health check never succeeds and is not meant to. It polls once a day rather than at the default one-second failure cadence, because every poll writes a health result and logs a line. It cannot affect the packages that depend on this one: all eight declare `kind: 'exists'`, which carries no `healthChecks` field at all.

Three replacements are in the marketplace:

| Package             | Relationship                                                                                                                                       |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| FileBrowser Quantum | A maintained fork of this project, published under this same package id as the `#quantum` flavor. Switching preserves files, users, and passwords. |
| copyparty           | A file server built for large and interrupted transfers, also mountable as a network drive.                                                        |
| NextExplorer        | A file manager with previews, per-user home folders, and link sharing.                                                                             |

Switching to FileBrowser Quantum is **one-way** — Quantum publishes no migration edge back to this line, so StartOS refuses the return install. It also does not carry over per-user folder restrictions or existing sharing links: an account confined to a subfolder will see the whole volume afterwards, so restricted accounts must be re-checked.

---

## Image and Container Runtime

The upstream image is used unmodified, with its own entrypoint, and one subcontainer runs the service.

| Property      | Value                                                                |
| ------------- | -------------------------------------------------------------------- |
| Image         | `filebrowser/filebrowser`                                            |
| Architectures | x86_64, aarch64                                                      |
| Entrypoint    | Upstream default                                                     |
| Subcontainer  | `filebrowser-sub` — the `primary` daemon, and the one to `attach` to |

A `chown` oneshot runs as root before the daemon on every start, handing the three volumes to the unprivileged user the application runs as. Install and the Set Admin Password action each use their own short-lived subcontainer (`set-admin`, `setadmin`) to run the application's CLI against the database while nothing else has it open.

## Volume and Data Layout

Four volumes are declared, three of which are in use.

| Volume     | Mount Point | Purpose                                                |
| ---------- | ----------- | ------------------------------------------------------ |
| `data`     | `/srv`      | The files File Browser serves — this is the whole tree |
| `database` | `/database` | The application's own database of users and settings   |
| `config`   | `/config`   | `settings.json` and `startos.json`                     |
| `main`     | — (unused)  | Retained only for the 0.3.5.1 migration path           |

Keeping the served files on their own volume is what makes File Browser mountable as another service's read-only library: a dependent mounts `data` and sees the files without the database or the configuration.

## File Models

Two models, both on the `config` volume. The application's own settings live in its database, not here.

| File            | Format | Modelled                | Written by                                    |
| --------------- | ------ | ----------------------- | --------------------------------------------- |
| `settings.json` | JSON   | Yes — `FileHelper.json` | Every init, and the Session Timeout action    |
| `startos.json`  | JSON   | Yes — `FileHelper.json` | Every init, and the End of Life Notice action |

`settings.json` is the application's configuration, and almost all of it is enforced.

**Enforced** — rewritten to a fixed value whenever the package writes the file: `port`, `address`, `baseURL`, `log`, `database`, and `root`. These are the wiring between the application and the volumes above; a hand edit is corrected at the next init or action write.

**Yours:** `tokenExpirationTime`, through the Set Session Timeout action.

The model also **strips keys it does not declare**, so anything else added to `settings.json` by hand is dropped on the next write. Everything else about File Browser — users, permissions, branding, commands — is configured inside the application and stored in its database.

`startos.json` is the package's own state rather than the application's, and holds one key: `eolAcknowledged`. It is on the `config` volume so it is backed up and restored with the rest of the package.

## Dependencies

None. Other services depend on File Browser — mounting its `data` volume as a read-only library — rather than the other way round.

## Network Access and Interfaces

One interface. Nothing is exported for dependent services; a dependent reaches the files through a volume mount instead.

| Interface | Id   | Type | Port | Description                    |
| --------- | ---- | ---- | ---- | ------------------------------ |
| Web UI    | `ui` | ui   | 8080 | The File Browser web interface |

The port is bound on the `main` MultiHost and is not masked.

## Installation and First-Run Flow

There is no first-run screen. Install creates the admin account itself, and then immediately asks you to replace its password:

1. Ownership of the three volumes is handed to the application's user.
2. The application's config is initialised and an `admin` user is created with a **known placeholder password**.
3. A `critical` task is raised pointing at Set Admin Password.
4. A `critical` task is raised pointing at End of Life Notice, unless `startos.json` already records the acknowledgement.

The placeholder is the reason the first task is `critical` rather than a suggestion: between install and running that action the account exists with a password that is not secret. Because `critical` blocks the service from starting, the window is one where File Browser is not yet serving — but do not skip past the task.

Step 4 runs on every init, not only install, so an install that predates this release meets the notice on the update that introduces it.

## Actions

Three actions. Two are user-facing; the third is hidden and reached only from the task that raises it.

### Set Admin Password

Sets the `admin` user's password to a freshly generated one. Run it when the install task prompts, and any time you need to regain access.

- **What it changes:** user id 1 in the application's database — its username is set to `admin`, its password to the new value, and the admin permission granted.
- **Availability:** only while the service is stopped, because it runs the application's CLI against the database directly.
- **Repeat safety:** safe to re-run; each run generates a fresh password and invalidates the previous one.
- **Outputs:** the username and the new password, the password masked and copyable, shown once.

### Set Session Timeout

Sets how long a browser session lasts before it is terminated.

- **What it changes:** `tokenExpirationTime` in `settings.json`.
- **Cost:** seconds, then a restart.
- **Repeat safety:** idempotent; the form is pre-filled with the current value.

### End of Life Notice

Records that the user has read the end-of-life notice. Hidden — reachable only from the task it raises, not from the Actions list.

- **What it changes:** `eolAcknowledged` in `startos.json` on the `config` volume.
- **Availability:** any status.
- **Repeat safety:** runs once per install; the task retracts once the flag is set. The handler throws unless the acknowledgement toggle is on.

## Tasks

Two tasks, both raised at install, and either blocks the service until you clear it.

| Task               | Severity   | Raised when                  | Cleared when    |
| ------------------ | ---------- | ---------------------------- | --------------- |
| Set Admin Password | `critical` | At install                   | The action runs |
| End of Life Notice | `critical` | The notice is unacknowledged | The action runs |

`critical` on Set Admin Password is protecting a real gap rather than being cautious: the account install creates has a placeholder password, so the service should not serve until it has been replaced. `critical` on End of Life Notice is deliberate too — the point is that the user cannot start the service without having seen that it is unmaintained.

## Health Checks

Two checks. One reports whether the service is working; the other never passes by design.

| Check                              | Method                   | Grace Period |
| ---------------------------------- | ------------------------ | ------------ |
| `primary` "Web Interface"          | HTTP `GET /health`       | SDK default  |
| `end-of-life` "Maintenance Status" | Always reports `failure` | None         |

`Maintenance Status` is the standing end-of-life reminder described in [End of Life](#end-of-life). It is expected to be red, and says nothing about whether the service is working — that is what `Web Interface` reports.

`Web Interface` probes the application's own health endpoint rather than only the port, so a pass means the application is serving. A failure means the process is down or crash-looping — the most likely cause on a first start is a permissions problem on one of the three volumes, which the `chown` oneshot exists to prevent.

## Backups and Restore

Three volumes are copied wholesale — `sdk.Backups.ofVolumes('data', 'database', 'config')`. No dump step and nothing excluded.

- **Included:** every file you have stored, the user database with its passwords and permissions, and both `settings.json` and `startos.json`.
- **Restore:** complete. Accounts and passwords come back as they were, so the install task does not reappear and the placeholder password is not reintroduced. The end-of-life acknowledgement rides along on the `config` volume, so a restored install is not asked again.

Note the size implication: `data` is the whole file tree, so the backup is as large as what you have stored.

## Limitations and Differences

1. **The admin account is created at install with a placeholder password**, replaced through a `critical` task rather than through a first-run screen.
2. **Setting the admin password requires stopping the service.**
3. **`settings.json` accepts nothing beyond the keys the package models** — undeclared keys are stripped on the next write.
4. **One served directory.** File Browser is pointed at a single volume; there is no way to add a second root here.
5. **No riscv64 build.** x86_64 and aarch64 only.
6. **Switching to FileBrowser Quantum cannot be undone.** Quantum publishes no migration edge back to this line, so StartOS refuses an install of this package over it. StartOS still renders a Switch button in that direction; the refusal surfaces at install time, before any data is touched.

---

## Quick Reference for AI Consumers

```yaml
package_id: filebrowser
image: filebrowser/filebrowser
architectures:
  - x86_64
  - aarch64
subcontainers:
  - filebrowser-sub # the running daemon
  - set-admin # temporary; install
  - setadmin # temporary; the Set Admin Password action
volumes:
  data: /srv
  database: /database
  config: /config
  main: unused (retained for the 0.3.5.1 migration)
file_models:
  - /config/settings.json
  - /config/startos.json
startos_managed_env_vars: []
dependencies: []
interfaces:
  ui: { type: ui, port: 8080 }
actions:
  - reset-admin-user # only-stopped
  - set-expiration
  - acknowledge-eol # hidden; reachable only from its task
tasks:
  - { action: reset-admin-user, severity: critical }
  - { action: acknowledge-eol, severity: critical }
health_checks:
  - primary # the daemon's ready check, displayed "Web Interface"
  - end-of-life # always fails by design, displayed "Maintenance Status"
```
