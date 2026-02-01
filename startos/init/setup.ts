import { resetAdminUser } from '../actions/resetAdminUser'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { mounts } from '../utils'

export const setup = sdk.setupOnInit(async (effects, kind) => {
  if (kind !== 'install') {
    return
  }

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
        'init',
      ])
      await sub.execFail([
        'filebrowser',
        '-c',
        '/config/settings.json',
        'users',
        'add',
        'admin',
        'taxationistheft',
        '--perm.admin',
      ])
    },
  )

  await sdk.action.createOwnTask(effects, resetAdminUser, 'critical', {
    reason: i18n('Create your admin user password'),
  })
})
