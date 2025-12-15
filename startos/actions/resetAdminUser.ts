import { utils } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { mounts, randomPassword } from '../utils'

export const resetAdminUser = sdk.Action.withoutInput(
  // id
  'reset-admin-user',

  // metadata
  async ({ effects }) => ({
    name: 'Set Admin Password',
    description: 'Create or reset your admin user and password',
    warning: null,
    allowedStatuses: 'only-stopped',
    group: null,
    visibility: 'enabled',
  }),

  // the execution function
  async ({ effects }) => {
    const password = utils.getDefaultString(randomPassword)
    await sdk.SubContainer.withTemp(
      effects,
      { imageId: 'filebrowser' },
      mounts,
      'setadmin',
      async (sub) => {
        await sub.exec([
          'filebrowser',
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
