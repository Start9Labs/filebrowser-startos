import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { execFile } from 'child_process'
import * as fs from 'fs/promises'
import { settingsJson } from '../fileModels/settings.json'

export const v_2_63_3_0 = VersionInfo.of({
  version: '2.63.3:0',
  releaseNotes: {
    en_US: `**Bumps**

- File Browser → 2.63.3
- start-sdk → 1.5.0`,
    es_ES: `**Cambios de versión**

- File Browser → 2.63.3
- start-sdk → 1.5.0`,
    de_DE: `**Versionsanhebungen**

- File Browser → 2.63.3
- start-sdk → 1.5.0`,
    pl_PL: `**Aktualizacje wersji**

- File Browser → 2.63.3
- start-sdk → 1.5.0`,
    fr_FR: `**Mises à jour de version**

- File Browser → 2.63.3
- start-sdk → 1.5.0`,
  },
  migrations: {
    up: async ({ effects }) => {
      // get old config.yaml
      const configYaml: { userTimeout?: string } | undefined = await fs
        .readFile('/media/startos/volumes/main/start9/config.yaml', 'utf-8')
        .then(YAML.parse, () => undefined)

      if (configYaml) {
        await settingsJson.merge(effects, {
          ...(configYaml.userTimeout
            ? { tokenExpirationTime: `${configYaml.userTimeout}h` }
            : {}),
        })

        // database
        try {
          await fs.cp(
            '/media/startos/volumes/main/filebrowser.db',
            '/media/startos/volumes/database/filebrowser.db',
          )
          await fs.rm('/media/startos/volumes/main/filebrowser.db')
        } catch (e) {
          console.error(e)
        }

        // srv
        await new Promise((res, rej) => {
          execFile(
            'sh',
            [
              '-c',
              'mv /media/startos/volumes/main/data/* /media/startos/volumes/data',
            ],
            (err) => (err ? rej(err) : res(null)),
          )
        }).catch(console.error)

        // remove old start9 dir
        await fs
          .rm('/media/startos/volumes/main/start9', { recursive: true })
          .catch(console.error)
      }
    },
    down: IMPOSSIBLE,
  },
})
