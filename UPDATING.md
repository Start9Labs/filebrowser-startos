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
