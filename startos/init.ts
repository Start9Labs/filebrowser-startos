import { sdk } from './sdk'
import { exposedStore, initStore } from './store'
import { setDependencies } from './dependencies'
import { setInterfaces } from './interfaces'
import { versions } from './versions'
import { actions } from './actions'
import { jsonFile } from './file-models/filebrowser.json'
import { configDefaults, mnt } from './utils'
import { resetAdminUser } from './actions/resetAdminUser'
import { mkdir } from 'fs/promises'

// **** Pre Install ****
const preInstall = sdk.setupPreInstall(async ({ effects }) => {
  await jsonFile.write(effects, configDefaults)
  await mkdir('/media/startos/volumes/main/files', { recursive: true })
})

// **** Post Install ****
const postInstall = sdk.setupPostInstall(async ({ effects }) => {
  await sdk.SubContainer.withTemp(
    effects,
    { imageId: 'filebrowser' },
    sdk.Mounts.of().addVolume({
      volumeId: 'main',
      subpath: null,
      mountpoint: mnt,
      readonly: false,
    }),
    'set-admin',
    async (sub) => {
      await sub.exec([
        '/filebrowser',
        '-c',
        `${mnt}/filebrowser.json`,
        'config',
        'init',
      ])
      await sub.exec([
        '/filebrowser',
        '-c',
        `${mnt}/filebrowser.json`,
        'users',
        'add',
        'admin',
        'taxationistheft',
        '--perm.admin',
      ])
    },
  )

  await sdk.store.setOwn(effects, sdk.StorePath.adminPassCreated, false)

  await sdk.action.requestOwn(effects, resetAdminUser, 'critical', {
    reason: 'Create your admin user password',
  })
})

// **** Uninstall ****
const uninstall = sdk.setupUninstall(async ({ effects }) => {})

/**
 * Plumbing. DO NOT EDIT.
 */
export const { packageInit, packageUninit, containerInit } = sdk.setupInit(
  versions,
  preInstall,
  postInstall,
  uninstall,
  setInterfaces,
  setDependencies,
  actions,
  initStore,
  exposedStore,
)
