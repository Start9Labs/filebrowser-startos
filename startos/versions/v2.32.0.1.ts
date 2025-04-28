import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'
import { readFile, rename, rmdir } from 'fs/promises'
import { load } from 'js-yaml'
import { jsonFile } from '../file-models/filebrowser.json'
import { configDefaults, mnt } from '../utils'

export const v_2_32_0_1 = VersionInfo.of({
  version: '2.32.0:1',
  releaseNotes: 'Revamped for StartOS 0.4.0',
  migrations: {
    up: async ({ effects }) => {
      // get old config.yaml
      const configYaml = load(
        await readFile('/root/start9/config.yaml', 'utf-8'),
      ) as { userTimeout: string }

      await jsonFile.write(effects, {
        ...configDefaults,
        tokenExpirationTime: `${configYaml.userTimeout}h`,
      })

      // rename root
      await rename('/root/data', `${mnt}/files`)

      // remove old start9 dir
      await rmdir('/root/start9')
    },
    down: IMPOSSIBLE,
  },
})
