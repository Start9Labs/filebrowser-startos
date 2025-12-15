import { VersionInfo, IMPOSSIBLE, YAML } from '@start9labs/start-sdk'
import * as fs from 'fs/promises'
import { settingsJson } from '../../fileModels/settings.json'
import { configDefaults } from '../../utils'

export const v_2_52_0_0 = VersionInfo.of({
  version: '2.52.0:0',
  releaseNotes: 'Revamped for StartOS 0.4.0',
  migrations: {
    up: async ({ effects }) => {
      // get old config.yaml
      const configYaml: { userTimeout?: string } | undefined = await fs
        .readFile('/media/startos/volumes/main/start9/config.yaml', 'utf-8')
        .then(YAML.parse, () => undefined)

      await settingsJson.write(effects, {
        ...configDefaults,
        tokenExpirationTime: configYaml?.userTimeout
          ? `${configYaml.userTimeout}h`
          : configDefaults.tokenExpirationTime,
      })

      await fs.mkdir('/media/startos/volumes/main/database', {
        recursive: true,
      })

      fs.rename(
        '/media/startos/volumes/main/database.db',
        '/media/startos/volumes/main/database/filebrowser.db',
      )

      if (!configYaml) {
        await fs.mkdir('/media/startos/volumes/main/files', { recursive: true })
      } else {
        // rename files dir
        await fs
          .rename(
            '/media/startos/volumes/main/data',
            '/media/startos/volumes/main/files',
          )
          .catch((e) => {
            if (e.code !== 'ENOENT') throw new Error(JSON.stringify(e))
          })

        // remove old start9 dir
        await fs
          .rm('/media/startos/volumes/main/start9', { recursive: true })
          .catch(console.error)
      }
    },
    down: IMPOSSIBLE,
  },
})
