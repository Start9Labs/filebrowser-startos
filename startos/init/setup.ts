import { resetAdminUser } from '../actions/resetAdminUser'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { mounts } from '../utils'

export const setup = sdk.setupOnInit(async (effects, kind) => {
  if (kind === 'install') {
    await sdk.SubContainer.withTemp(
      effects,
      { imageId: 'filebrowser' },
      mounts,
      'set-admin',
      async (sub) => {
        await sub.execFail(
          ['filebrowser', '-c', '/config/settings.json', 'config', 'init'],
          { user: 'root' },
        )
        await sub.execFail(
          [
            'filebrowser',
            '-c',
            '/config/settings.json',
            'users',
            'add',
            'admin',
            'taxationistheft',
            '--perm.admin',
          ],
          { user: 'root' },
        )
      },
    )

    await sdk.action.createOwnTask(effects, resetAdminUser, 'critical', {
      reason: i18n('Create your admin user password'),
    })
  }
})
