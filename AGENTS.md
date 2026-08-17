# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (technical reference for an AI support or administering agent) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Keep the served files on the `data` volume alone.** Sibling packages mount it read-only as an external library, so anything else that lands there becomes visible to them. The database and `settings.json` are on separate volumes for that reason.
- **The install-time admin password is a placeholder, and the `critical` task is what covers it.** Don't downgrade that task or move account creation to a first-run screen without closing that window some other way.
- **`reset-admin-user` must stay `only-stopped`.** It drives the application's own CLI against the database, which the running daemon holds open.
- **The `chown` oneshot runs on every start, not just install.** A volume can arrive from a restore owned by the wrong uid, and the application does not repair that itself.
- **The `main` volume is retained solely for the 0.3.5.1 migration path.** Don't reuse it for new data, and don't drop it from the manifest.
- **The `end-of-life` health check is meant to fail forever — don't "fix" it.** Upstream ended the project, so the check is a standing reminder rather than a diagnostic. Leave `gracePeriod: 0` and the daily `cooldownTrigger` alone: the default trigger polls a failing check every second and `setHealth` is not deduplicated, so the defaults would write a health result and log a line every second for the life of the service. Keep its `requires` empty — a daemon that required it would sit at `waiting` and never start.
- **`acknowledge-eol` must outlive any decision to retire this package.** Deleting an action while a user still has its task outstanding freezes that task: the package stays stopped and nothing the user can do clears it. Ship `sdk.action.clearTask` in a release _before_ removing the action.
- **The maintained fork ships as the `#quantum` flavor of this same id** (`filebrowser-quantum-startos`), so the two are one marketplace listing. Don't rename this package's `id`. The switch is one-way — Quantum publishes no `down` edge back to this line — and StartOS still renders a Switch button in that direction, so the refusal surfaces at install time.
