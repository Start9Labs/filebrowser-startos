# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

**Start every task at the recipe index** — `../start-technologies/projects/start-sdk/docs/src/recipes.md`
(or <https://docs.start9.com/packaging/recipes.html>). It maps an intent ("prompt the user to create
admin credentials", "expose a web UI") to the constructs, the reference pages, and a named production
package to copy. Find the recipe before you read this package's neighbours: a package you reach by
grepping may be non-conformant, and the recipe outranks it.

Freshly scaffolded? Work the
[New Package Checklist](../start-technologies/projects/start-sdk/docs/src/new-package-checklist.md)
(or <https://docs.start9.com/packaging/new-package-checklist.html>) from top to bottom. It is a
guide page, not a file in this repo — read it, don't copy it in.

Keep `README.md` (technical reference for an AI support or administering agent) and
`instructions.md` (end-user docs) in sync with your changes. This file restates neither:
whoever changes the package has both, so it carries only what they don't — repo mechanics,
a change that looks right and is not, where the next thing gets added, a naming trap, a
build or test invocation particular to this repo.

**Fix a defect you spot rather than reporting it** — you have the package open and the
context to be sure. File **a GitHub issue on this repo** only when the call isn't yours to
make: you can't pin the cause down, two defensible fixes exist, or it's too large to ride on
the work in hand. An open issue is a report, not a queue — implement one when you're asked
to or when it's labelled `Approved`, then close it with `Closes #<n>`.

Don't record work in the repo instead: no `TODO.md`, no `NOTES.md`, no `PLAN.md`. What you
verified, tried, and decided belongs in the commit message and the PR body.

## This repo

- **Keep the served files alone on the `data` volume, and keep the `main` volume in the manifest.** Sibling packages mount `data` read-only as a library, so anything else written there shows up in them; `main` exists only for the 0.3.5.1 migration path and must not be reused for new data.
- **Don't relax the admin-account safeguards.** The install-time password is a placeholder that only the `critical` Set Admin Password task covers; `reset-admin-user` stays `only-stopped` because it drives the CLI against the database the daemon holds open; the `chown` oneshot stays on every start because a restore can hand back volumes owned by the wrong uid.
- **The `end-of-life` health check is meant to fail forever — don't "fix" it**, and leave `gracePeriod: 0`, `statusTrigger(86_400_000, { starting: 1_000 })` and its empty `requires` as they are: the default trigger logs a failure every second, a daily first interval parks the service in `Starting` for a day, and a daemon requiring it never starts. **`acknowledge-eol` must outlive any retirement of this package** — ship `sdk.action.clearTask` in a release before removing it, or an outstanding task freezes the package stopped.
- **Don't rename this package's `id`.** The maintained fork ships as its `#quantum` flavor (`filebrowser-quantum-startos`), one marketplace listing; the switch is one-way and StartOS still renders a Switch button back, so the refusal surfaces at install time.
