<p align="center">
  <img src="icon.svg" alt="File Browser Logo" width="21%">
</p>

# File Browser on StartOS

> **Upstream docs:** <https://github.com/filebrowser/filebrowser/tree/master/www/docs>
>
> Everything not listed in this document should behave the same as upstream
> File Browser. If a feature, setting, or behavior is not mentioned here,
> the upstream documentation is accurate and fully applicable.

[File Browser](https://github.com/filebrowser/filebrowser) provides a web-based file management interface for uploading, downloading, organizing, editing, and sharing files. It supports multiple users with individual directories.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Configuration Management](#configuration-management)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Actions (StartOS UI)](#actions-startos-ui)
- [Dependencies](#dependencies)
- [Backups and Restore](#backups-and-restore)
- [Health Checks](#health-checks)
- [Limitations and Differences](#limitations-and-differences)
- [What Is Unchanged from Upstream](#what-is-unchanged-from-upstream)
- [Contributing](#contributing)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

| Property | Value |
|----------|-------|
| Image | `filebrowser/filebrowser` (upstream unmodified) |
| Architectures | x86_64, aarch64 |
| Entrypoint | Default upstream entrypoint |

---

## Volume and Data Layout

| Volume | Mount Point | Purpose |
|--------|-------------|---------|
| `data` | `/srv` | User files (the browsable file storage) |
| `database` | `/database` | SQLite database (`filebrowser.db`) |
| `config` | `/config` | Settings file (`settings.json`) |

**StartOS-specific files:**

- `settings.json` — configuration file managed by StartOS
- `filebrowser.db` — user accounts and application database

---

## Installation and First-Run Flow

| Step | Upstream | StartOS |
|------|----------|---------|
| Initial credentials | Default: admin/admin | Use "Set Admin Password" action to generate secure credentials |
| Configuration | CLI flags or config file | Settings managed via actions |
| First access | Login with default creds | Run action first to get credentials |

**Key difference:** On StartOS, you should run the "Set Admin Password" action after installation to generate a secure random password. The action will display your credentials.

---

## Configuration Management

| Setting | Upstream Method | StartOS Method |
|---------|-----------------|----------------|
| `port` | Config/CLI | Fixed: `8080` |
| `address` | Config/CLI | Fixed: `0.0.0.0` |
| `baseURL` | Config/CLI | Fixed: empty |
| `log` | Config/CLI | Fixed: `stdout` |
| `database` | Config/CLI | Fixed: `/database/filebrowser.db` |
| `root` | Config/CLI | Fixed: `/srv` |
| `tokenExpirationTime` | Config/CLI | "Set Session Timeout" action |

**Configuration NOT exposed on StartOS:**

- `branding.name` — custom branding
- `branding.files` — custom CSS/JS
- `auth.method` — authentication method (uses default)
- `auth.header` — proxy auth header
- Commands configuration

---

## Network Access and Interfaces

| Interface | Port | Protocol | Purpose |
|-----------|------|----------|---------|
| Web UI | 8080 | HTTP | File management interface |

**Access methods (StartOS 0.4.0):**

- LAN IP with unique port
- `<hostname>.local` with unique port
- Tor `.onion` address
- Custom domains (if configured)

---

## Actions (StartOS UI)

### Set Admin Password

| Property | Value |
|----------|-------|
| ID | `reset-admin-user` |
| Name | Set Admin Password |
| Visibility | Enabled |
| Availability | Only when stopped |
| Purpose | Create or reset admin credentials |

**Output:** Displays username (`admin`) and a randomly generated 22-character password.

**Use this action:**
- After first installation to get initial credentials
- If you forget your password
- To rotate credentials for security

### Set Session Timeout

| Property | Value |
|----------|-------|
| ID | `set-expiration` |
| Name | Set Session Timeout |
| Visibility | Enabled |
| Availability | Any status |
| Purpose | Configure browser session duration |

**Options:**

| Setting | Default | Description |
|---------|---------|-------------|
| Session Timeout | 12 | Hours before automatic logout (minimum: 1) |

---

## Dependencies

None. File Browser is a standalone application.

---

## Backups and Restore

**Included in backup:**

- `data` volume — all user files
- `database` volume — user accounts, settings, shares
- `config` volume — application configuration

**Restore behavior:**

- All files, users, and settings are restored
- Login credentials remain the same as before backup

---

## Health Checks

| Check | Method | Grace Period |
|-------|--------|--------------|
| Web Interface | HTTP GET `/health` | Default |

**Messages:**

- Success: "The web interface is ready"
- Error: "The web interface is not ready"

---

## Limitations and Differences

1. **Fixed directory structure** — root browsing directory is always `/srv`; cannot be changed
2. **No custom branding** — branding options not exposed
3. **No proxy authentication** — alternative auth methods not configurable
4. **No custom commands** — command execution feature not configurable via StartOS
5. **Admin username fixed** — always `admin`; only password can be changed

---

## What Is Unchanged from Upstream

- Full file management (upload, download, delete, rename, move, copy)
- File preview and editing
- Multi-user support with permissions
- File sharing with links
- Search functionality
- Directory browsing
- Archive creation/extraction
- All web UI features

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for build instructions and development workflow.

---

## Quick Reference for AI Consumers

```yaml
package_id: filebrowser
image: filebrowser/filebrowser
architectures: [x86_64, aarch64]
volumes:
  data: /srv
  database: /database
  config: /config
ports:
  ui: 8080
dependencies: none
startos_managed_env_vars: none
actions:
  - reset-admin-user
  - set-expiration
```
