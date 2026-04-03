import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { execFile } from 'child_process'
import * as fs from 'fs/promises'
import { settingsJson } from '../fileModels/settings.json'

export const v_2_62_2_1 = VersionInfo.of({
  version: '2.62.2:1',
  releaseNotes: {
    en_US: 'Update File Browser to 2.62.2',
    es_ES: 'Actualización de File Browser a 2.62.2',
    de_DE: 'Update von File Browser auf 2.62.2',
    pl_PL: 'Aktualizacja File Browser do 2.62.2',
    fr_FR: 'Mise à jour de File Browser vers 2.62.2',
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
