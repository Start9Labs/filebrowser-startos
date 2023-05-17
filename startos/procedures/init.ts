import { setupInit } from '@start9labs/start-sdk/lib/inits/setupInit'
import { setupInstall } from '@start9labs/start-sdk/lib/inits/setupInstall'
import { setupUninstall } from '@start9labs/start-sdk/lib/inits/setupUninstall'
import { WrapperData } from '../wrapperData'
import { migrations } from './migrations'
import { getRandomPassword } from './utils/getRandomPassword'
import { sdk } from '../sdk'
import { setInterfaces } from './interfaces'

/**
 * Here you define arbitrary code that runs once, on fresh install only
 */
const install = sdk.setupInstall(async ({ effects, utils }) => {
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
  await utils.store.setOwn('/config/name', username)
  await utils.vault.set('password', password)
})

/**
 * Here you define arbitrary code that runs once, on uninstall only
 */
const uninstall = sdk.setupUninstall(async ({ effects, utils }) => {})

/**
 * This is a static function. There is no need to make changes here
 */
export const { init, uninit } = sdk.setupInit(
  migrations,
  install,
  uninstall,
  setInterfaces,
)
