import { resetAdminUser } from '../actions/resetAdminUser'
import { sdk } from '../sdk'
import { mounts } from '../utils'

export const setup = sdk.setupOnInit(async (effects, kind) => {
  if (kind !== 'install') {
    return
  }

  // await sdk.SubContainer.withTemp(
  //   effects,
  //   { imageId: 'filebrowser' },
  //   mounts,
  //   'set-admin',
  //   async (sub) => {
  // await sub.execFail(['chown', '-R', '1000:1000', '/database'])
  // await sub.execFail(['chown', '-R', '1000:1000', '/database'])
  // await sub.execFail(['chown', '-R', '1000:1000', '/database'])

  //     await sub.execFail(
  //       ['filebrowser', 'config', 'init', '-c', '/config/settings.json'],
  //     )
  //     await sub.execFail(
  //       [
  //         'filebrowser',
  //         'users',
  //         'add',
  //         'admin',
  //         'taxationistheft',
  //         '--perm.admin',
  //         '-c',
  //         '/config/settings.json',
  //       ]
  //     )
  //   },
  // )

  // await sdk.action.createOwnTask(effects, resetAdminUser, 'critical', {
  //   reason: 'Create your admin user password',
  // })
})
