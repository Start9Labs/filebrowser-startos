import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { execFile } from 'child_process'
import * as fs from 'fs/promises'
import { settingsJson } from '../../fileModels/settings.json'

export const v_2_61_0_0_b0 = VersionInfo.of({
  version: '2.61.0:0-beta.0',
  releaseNotes: {
    en_US: 'Revamped for StartOS 0.4.0',
    es_ES: 'Renovado para StartOS 0.4.0',
    de_DE: 'Überarbeitet für StartOS 0.4.0',
    pl_PL: 'Przebudowano dla StartOS 0.4.0',
    fr_FR: 'Remanié pour StartOS 0.4.0',
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
        await fs
          .rename(
            '/media/startos/volumes/main/database.db',
            '/media/startos/volumes/database/filebrowser.db',
          )
          .catch(console.error)

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
