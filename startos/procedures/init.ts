import { migrations } from './migrations'
import { sdk } from '../sdk'
import { setInterfaces } from './interfaces'
import { newPassword } from './actions/resetRootUser'

const install = sdk.setupInstall(async ({ effects, utils }) => {
  await newPassword(null, utils, effects)
})

const uninstall = sdk.setupUninstall(async ({ effects, utils }) => {})

export const { init, uninit } = sdk.setupInit(
  migrations,
  install,
  uninstall,
  setInterfaces,
)
