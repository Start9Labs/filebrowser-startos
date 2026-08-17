# Updating the upstream version

## Determining the upstream version

**File Browser** — [filebrowser/filebrowser](https://github.com/filebrowser/filebrowser):

```sh
gh release view -R filebrowser/filebrowser --json tagName -q .tagName
```

Cross-check that the matching tag is published on Docker Hub:

```sh
curl -fsSL "https://hub.docker.com/v2/repositories/filebrowser/filebrowser/tags?page_size=20&ordering=last_updated" | jq -r '.results[].name'
```

The current version is pinned as the `v<version>` tag of `dockerTag` in `startos/manifest/index.ts`.

## Applying the bump

Edit `startos/manifest/index.ts` and set `images.filebrowser.source.dockerTag` to `filebrowser/filebrowser:v<new version>`.

## Retiring this package

File Browser is end-of-life and this package now raises a `critical`
`acknowledge-eol` task on install. **Do not delete the `acknowledge-eol` action
while any user could still have that task outstanding.** A task whose action no
longer exists freezes: the package stays stopped and nothing the user can do
will clear it. If this package is ever withdrawn, clear the task first —
`sdk.action.clearTask(effects, 'filebrowser:acknowledge-eol')` — in a release
that ships _before_ the action is removed.
