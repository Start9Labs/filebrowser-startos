import { resetAdminUser } from '../actions/resetAdminUser'
import { sdk } from '../sdk'
import { mnt } from '../utils'

export const setup = sdk.setupOnInstall(async (effects) => {
  await sdk.SubContainer.withTemp(
    effects,
    { imageId: 'filebrowser' },
    sdk.Mounts.of().mountVolume({
      volumeId: 'main',
      subpath: null,
      mountpoint: mnt,
      readonly: false,
    }),
    'set-admin',
    async (sub) => {
      await sub.exec([
        '/filebrowser',
        '-c',
        `${mnt}/filebrowser.json`,
        'config',
        'init',
      ])
      await sub.exec([
        '/filebrowser',
        '-c',
        `${mnt}/filebrowser.json`,
        'users',
        'add',
        'admin',
        'taxationistheft',
        '--perm.admin',
      ])
    },
  )

  await sdk.action.createOwnTask(effects, resetAdminUser, 'critical', {
    reason: 'Create your admin user password',
  })
})
