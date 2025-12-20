import { VersionInfo, IMPOSSIBLE, YAML } from '@start9labs/start-sdk'
import * as fs from 'fs/promises'
import { settingsJson } from '../../fileModels/settings.json'
import { configDefaults, mounts } from '../../utils'
import { execFile } from 'child_process'
import { sdk } from '../../sdk'

export const v_2_52_0_1_b1 = VersionInfo.of({
  version: '2.52.0:1-beta.1',
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

      // database
      await fs
        .rename(
          '/media/startos/volumes/main/database.db',
          '/media/startos/volumes/database/filebrowser.db',
        )
        .catch(console.error)

      // config
      await fs
        .rename(
          '/media/startos/volumes/main/filebrowser.json',
          '/media/startos/volumes/config/settings.json',
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

      await sdk.SubContainer.withTemp(
        effects,
        { imageId: 'filebrowser' },
        mounts,
        'set-admin',
        async (sub) => {
          await sub.execFail(
            ['chown', '-R', 'user:user', '/srv', '/database', '/config'],
            { user: 'root' },
          )
          await sub.execFail([
            'filebrowser',
            '-c',
            '/config/settings.json',
            'config',
            'set',
            '--file-mode=0644',
            '--dir-mode=0755',
          ])
        },
      )
    },
    down: IMPOSSIBLE,
  },
})
