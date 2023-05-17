import { getRandomPassword } from '../utils/getRandomPassword'
import { Config } from '@start9labs/start-sdk/lib/config/builder/config'
import { sdk } from '../../sdk'

/**
 * This is an example Action
 *
 * By convention, each action receives its own file
 *
 * Actions optionally take an arbitrary config form as input
 */
const input = Config.of({})

/**
 * This function defines the Action, including the FormSpec (if any)
 *
 * The first argument is the Action metadata. The second argument is the Action function
 *
 * If no input is required, FormSpec would be null
 */
export const resetRootUser = sdk.createAction(
  {
    name: 'Reset Root User',
    description:
      'Resets your root user (the first user) to username "admin" and a random password; restores any lost admin privileges.',
    id: 'resetRootUser',
    input,
    allowedStatuses: 'any',
  },
  async ({ effects, utils, input }) => {
    const password = getRandomPassword()
    await utils.vault.set('password', password)
    await effects.runCommand(`filebrowser users update 1 -u admin `)
    await effects.runCommand(`filebrowser users update 1 -p "${password}"`)
    await effects.runCommand(`filebrowser users update 1 --perm.admin`)
    return {
      message: `Here is your new password. This will also be reflected in the Properties page for this service.`,
      value: {
        value: password,
        copyable: true,
        qr: false,
      },
    }
  },
)
