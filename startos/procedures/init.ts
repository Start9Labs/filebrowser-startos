import { setupInit } from '@start9labs/start-sdk/lib/inits/setupInit'
import { setupInstall } from '@start9labs/start-sdk/lib/inits/setupInstall'
import { setupUninstall } from '@start9labs/start-sdk/lib/inits/setupUninstall'
import { WrapperData } from '../wrapperData'
import { migrations } from './migrations'
import { getRandomPassword } from './utils/getRandomPassword'
import { sdk } from '../sdk'
import { setInterfaces } from './interfaces'
import { newPassword } from './actions/resetRootUser'

/**
 * Here you define arbitrary code that runs once, on fresh install only
 */
const install = sdk.setupInstall(async ({ effects, utils }) => {
  await newPassword(null, utils, effects)
})

const setupExports = sdk.setupExports(({ effects, utils }) => {
  return {
    ui: [],
    services: [],
  }
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
  setupExports,
)
