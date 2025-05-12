import { utils } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { mnt, randomPassword } from '../utils'
import { store } from '../file-models/store.json'

export const resetAdminUser = sdk.Action.withoutInput(
  // id
  'reset-admin-user',

  // metadata
  async ({ effects }) => {
    const adminExists = await store
      .read((s) => s.adminPassCreated)
      .const(effects)

    const nameStr = 'Admin User'
    const descStr = 'Admin User'

    return {
      name: adminExists ? `Reset ${nameStr}` : `Create ${nameStr}`,
      description: adminExists ? `Reset ${descStr}` : `Create ${descStr}`,
      warning: adminExists
        ? 'Are you sure you want to reset your admin user?'
        : null,
      allowedStatuses: 'only-stopped',
      group: null,
      visibility: 'enabled',
    }
  },

  // the execution function
  async ({ effects }) => {
    const password = utils.getDefaultString(randomPassword)
    await sdk.SubContainer.withTemp(
      effects,
      { imageId: 'filebrowser' },
      sdk.Mounts.of().mountVolume({
        volumeId: 'main',
        subpath: null,
        mountpoint: '/root',
        readonly: false,
      }),
      'setadmin',
      async (sub) => {
        await sub.exec([
          '/filebrowser',
          '-c',
          `${mnt}/filebrowser.json`,
          'users',
          'update',
          '1',
          '-u',
          adminUsername,
          '-p',
          password,
          '--perm.admin',
        ])
      },
    )
    await store.merge(effects, { adminPassCreated: true })

    return {
      version: '1',
      title: 'Success!',
      message:
        'Your admin username and password are below. Write them down or save them to a password manager.',
      result: {
        type: 'group',
        value: [
          {
            type: 'single',
            name: 'Username',
            description: null,
            value: adminUsername,
            masked: false,
            copyable: true,
            qr: false,
          },
          {
            type: 'single',
            name: 'Password',
            description: null,
            value: password,
            masked: true,
            copyable: true,
            qr: false,
          },
        ],
      },
    }
  },
)

const adminUsername = 'admin'
