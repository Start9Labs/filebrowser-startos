import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'
import * as fs from 'fs/promises'
import { load } from 'js-yaml'
import { jsonFile } from '../file-models/filebrowser.json'
import { configDefaults } from '../utils'

export const v_2_32_0_1 = VersionInfo.of({
  version: '2.32.0:1',
  releaseNotes: 'Revamped for StartOS 0.4.0',
  migrations: {
    // TODO: make this handle:
    // - missing config
    // - start9 dir already removed
    up: async ({ effects }) => {
      // get old config.yaml
      const configYaml = load(
        await fs.readFile(
          '/media/startos/volumes/main/start9/config.yaml',
          'utf-8',
        ),
      ) as { userTimeout: string }

      await jsonFile.write(effects, {
        ...configDefaults,
        tokenExpirationTime: `${configYaml.userTimeout}h`,
      })

      // rename root
      await fs
        .rename(
          '/media/startos/volumes/main/data',
          `/media/startos/volumes/main/files`,
        )
        .catch((e) => {
          if (e.code !== 'ENOENT') throw new Error(JSON.stringify(e))
        })

      // remove old start9 dir
      await fs.rm('/media/startos/volumes/main/start9', { recursive: true })
    },
    down: IMPOSSIBLE,
  },
})
