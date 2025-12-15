import { sdk } from './sdk'
import { mounts, uiPort } from './utils'

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
    mounts,
    'filebrowser-sub',
  )

  return (
    sdk.Daemons.of(effects, started)
      // .addOneshot('chown', {
      //   subcontainer,
      //   exec: {
      //     command: ['chown', '-R', 'user:user', '/database', '/config', '/srv'],
      //     user: 'root',
      //   },
      //   requires: [],
      // })
      .addDaemon('primary', {
        subcontainer,
        exec: { command: sdk.useEntrypoint(), runAsInit: true },
        ready: {
          display: 'Web Interface',
          fn: () =>
            sdk.healthCheck.checkWebUrl(
              effects,
              `http://localhost:${uiPort}/health`,
              {
                successMessage: 'The web interface is ready',
                errorMessage: 'The web interface is not ready',
              },
            ),
        },
        requires: [],
      })
  )
})
