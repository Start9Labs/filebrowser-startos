import { sdk } from './sdk'
import { mounts, uiPort } from './utils'
import { i18n } from './i18n'

export const main = sdk.setupMain(async ({ effects }) => {
  /**
   * ======================== Setup (optional) ========================
   *
   * In this section, we fetch any resources or run any desired preliminary commands.
   */
  console.info(i18n('[i] Starting File Browser'))

  /**
   * ======================== Daemons ========================
   *
   * In this section, we create one or more daemons that define the service runtime.
   *
   * Each daemon defines its own health check, which can optionally be exposed to the user.
   */
  const subcontainer = sdk.SubContainer.of(
    effects,
    { imageId: 'filebrowser' },
    mounts,
    'filebrowser-sub',
  )

  return sdk.Daemons.of(effects)
    .addOneshot('chown', {
      subcontainer,
      exec: {
        command: ['chown', '-R', 'user:user', '/srv', '/database', '/config'],
        user: 'root',
      },
      requires: [],
    })
    .addDaemon('primary', {
      subcontainer,
      exec: { command: sdk.useEntrypoint() },
      ready: {
        display: i18n('Web Interface'),
        fn: () =>
          sdk.healthCheck.checkWebUrl(
            effects,
            `http://localhost:${uiPort}/health`,
            {
              successMessage: i18n('The web interface is ready'),
              errorMessage: i18n('The web interface is not ready'),
            },
          ),
      },
      requires: ['chown'],
    })
    .addHealthCheck('end-of-life', {
      ready: {
        display: i18n('Maintenance Status'),
        // A trigger sleeps before its first yield, and StartOS reads a service
        // as starting while any of its checks is, so the first interval has to
        // stay short. Daily after that: the verdict never changes and setHealth
        // is not deduplicated, so every poll writes a health result and a log.
        gracePeriod: 0,
        trigger: sdk.trigger.statusTrigger(86_400_000, { starting: 1_000 }),
        fn: () => ({
          result: 'failure' as const,
          message: i18n(
            'File Browser is no longer maintained and will not receive further releases or security fixes. FileBrowser Quantum, a maintained fork of this project, is available in the marketplace as a replacement.',
          ),
        }),
      },
      requires: [],
    })
})
