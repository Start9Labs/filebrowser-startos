import { setupInit } from '@start9labs/start-sdk/lib/inits/setupInit'
import { setupInstall } from '@start9labs/start-sdk/lib/inits/setupInstall'
import { setupUninstall } from '@start9labs/start-sdk/lib/inits/setupUninstall'
import { WrapperData } from '../wrapperData'
import { migrations } from './migrations'
import { getRandomPassword } from './utils/getRandomPassword'

/**
 * Here you define arbitrary code that runs once, on fresh install only
 */
const install = setupInstall<WrapperData>(async ({ effects, utils }) => {
  const password = getRandomPassword()
  const username = 'admin'
  await effects.runCommand('mkdir -p /root/start9')
  await effects.runCommand('mkdir /root/www')
  await effects.runCommand('mkdir /root/data')
  await effects.runCommand('filebrowser config init')
  await effects.runCommand(
    'filebrowser config set --address=0.0.0.0 --port=8080 --root=/root/data',
  )
  await effects.runCommand(
    `filebrowser users add ${username} "${password}" --perm.admin=true`,
  )
  await utils.setOwnWrapperData('/default', { password, username })
})

/**
 * Here you define arbitrary code that runs once, on uninstall only
 */
const uninstall = setupUninstall<WrapperData>(async ({ effects, utils }) => {})

/**
 * This is a static function. There is no need to make changes here
 */
export const { init, uninit } = setupInit(migrations, install, uninstall)
