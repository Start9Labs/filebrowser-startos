import {} from '@start9labs/start-sdk/lib/health'
import {
  CheckResult,
  checkPortListening,
} from '@start9labs/start-sdk/lib/health/checkFns'
import { ExpectedExports } from '@start9labs/start-sdk/lib/types'
import { HealthReceipt } from '@start9labs/start-sdk/lib/health/HealthReceipt'
import { Daemons } from '@start9labs/start-sdk/lib/mainFn/Daemons'
import { sdk } from '../sdk'

export const main: ExpectedExports.main = sdk.setupMain(
  async ({ effects, utils, started }) => {
    /**
     * ======================== Setup ========================
     *
     * In this section, you will fetch any resources or run any commands necessary to run the service
     */

    /**
     * ======================== Additional Health Checks (optional) ========================
     *
     * In this section, you will define additional health checks beyond those associated with daemons
     */
    const healthReceipts: HealthReceipt[] = []

    /**
     * ======================== Daemons ========================
     *
     * In this section, you will create one or more daemons that define the service runtime
     *
     * Each daemon defines its own health check, which can optionally be exposed to the user
     */
    return Daemons.of({
      effects,
      started,
      healthReceipts, // Provide the healthReceipts or [] to prove they were at least considered
    }).addDaemon('filebrowser', {
      command: 'filebrowser --disable-exec=true', // The command to start the daemon
      ready: {
        display: 'Filebrowser is ready',
        // The function to run to determine the health status of the daemon
        fn: async () =>
          Promise.all([
            utils.childProcess.exec('filebrowser version'),
            checkPortListening(effects, 8080, {
              successMessage: 'The web interface is ready',
              errorMessage: 'The web interface is not ready',
            }),
          ])
            .then(() => ({ status: 'passing' } as CheckResult))
            .catch(() => ({ status: 'failing' } as CheckResult)),
      },
      requires: [],
    })
  },
)
