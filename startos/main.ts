import { sdk } from './sdk'
import { mnt, uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects, started }) => {
  /**
   * ======================== Setup (optional) ========================
   *
   * In this section, we fetch any resources or run any desired preliminary commands.
   */
  console.info('[i] Starting File Browser')

  /**
   * ======================== Daemons ========================
   *
   * In this section, we create one or more daemons that define the service runtime.
   *
   * Each daemon defines its own health check, which can optionally be exposed to the user.
   */
  const subcontainer = await sdk.SubContainer.of(
    effects,
    { imageId: 'filebrowser' },
    sdk.Mounts.of().mountVolume({
      volumeId: 'main',
      subpath: null,
      mountpoint: mnt,
      readonly: false,
    }),
    'filebrowser-sub',
  )

  return sdk.Daemons.of(effects, started)
    .addOneshot('chown', {
      subcontainer,
      exec: { command: ['chown', '-R', 'user:user', mnt], user: 'root' },
      requires: [],
    })
    .addDaemon('primary', {
      subcontainer,
      exec: { command: sdk.useEntrypoint(['-c', `${mnt}/filebrowser.json`]) },
      ready: {
        display: 'Web Interface',
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, uiPort, {
            successMessage: 'The web interface is ready',
            errorMessage: 'The web interface is not ready',
          }),
      },
      requires: ['chown'],
    })
})
