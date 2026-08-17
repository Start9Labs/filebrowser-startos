<p align="center">
  <img src="icon.svg" alt="File Browser Logo" width="21%">
</p>

# File Browser on StartOS

> Everything not listed in this document should behave the same as upstream
> File Browser. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

[File Browser](https://github.com/filebrowser/filebrowser) is a web file manager for a single directory tree. On StartOS its files, its database, and its configuration live on three separate volumes, and the admin account is created during install rather than through a first-run screen.

- **Upstream repo:** <https://github.com/filebrowser/filebrowser>
- **Wrapper repo:** <https://github.com/Start9Labs/filebrowser-startos>

---

## Table of Contents

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
| `config`   | `/config`   | `settings.json`                                        |
| `main`     | — (unused)  | Retained only for the 0.3.5.1 migration path           |

Keeping the served files on their own volume is what makes File Browser mountable as another service's read-only library: a dependent mounts `data` and sees the files without the database or the configuration.

## File Models

One model, and almost all of it is enforced — the application's own settings live in its database, not here.

| File            | Format | Modelled                | Written by                                 |
| --------------- | ------ | ----------------------- | ------------------------------------------ |
| `settings.json` | JSON   | Yes — `FileHelper.json` | Every init, and the Session Timeout action |

**Enforced** — rewritten to a fixed value whenever the package writes the file: `port`, `address`, `baseURL`, `log`, `database`, and `root`. These are the wiring between the application and the volumes above; a hand edit is corrected at the next init or action write.

**Yours:** `tokenExpirationTime`, through the Set Session Timeout action.

The model also **strips keys it does not declare**, so anything else added to `settings.json` by hand is dropped on the next write. Everything else about File Browser — users, permissions, branding, commands — is configured inside the application and stored in its database.

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

The placeholder is the reason the task is `critical` rather than a suggestion: between install and running that action the account exists with a password that is not secret. Because `critical` blocks the service from starting, the window is one where File Browser is not yet serving — but do not skip past the task.

## Actions

Two actions, both user-facing.

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

## Tasks

One task, raised at install, and it blocks the service until you clear it.

| Task               | Severity   | Raised when | Cleared when    |
| ------------------ | ---------- | ----------- | --------------- |
| Set Admin Password | `critical` | At install  | The action runs |

`critical` here is protecting a real gap rather than being cautious: the account install creates has a placeholder password, so the service should not serve until it has been replaced.

## Health Checks

One check, on the primary daemon.

| Check                     | Method             | Grace Period |
| ------------------------- | ------------------ | ------------ |
| `primary` "Web Interface" | HTTP `GET /health` | SDK default  |

It probes the application's own health endpoint rather than only the port, so a pass means the application is serving. A failure means the process is down or crash-looping — the most likely cause on a first start is a permissions problem on one of the three volumes, which the `chown` oneshot exists to prevent.

## Backups and Restore

Three volumes are copied wholesale — `sdk.Backups.ofVolumes('data', 'database', 'config')`. No dump step and nothing excluded.

- **Included:** every file you have stored, the user database with its passwords and permissions, and `settings.json`.
- **Restore:** complete. Accounts and passwords come back as they were, so the install task does not reappear and the placeholder password is not reintroduced.

Note the size implication: `data` is the whole file tree, so the backup is as large as what you have stored.

## Limitations and Differences

1. **The admin account is created at install with a placeholder password**, replaced through a `critical` task rather than through a first-run screen.
2. **Setting the admin password requires stopping the service.**
3. **`settings.json` accepts nothing beyond the keys the package models** — undeclared keys are stripped on the next write.
4. **One served directory.** File Browser is pointed at a single volume; there is no way to add a second root here.
5. **No riscv64 build.** x86_64 and aarch64 only.

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
startos_managed_env_vars: []
dependencies: []
interfaces:
  ui: { type: ui, port: 8080 }
actions:
  - reset-admin-user # only-stopped
  - set-expiration
tasks:
  - { action: reset-admin-user, severity: critical }
health_checks:
  - primary # the daemon's ready check, displayed "Web Interface"
```
