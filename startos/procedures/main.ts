import {} from '@start9labs/start-sdk/lib/health'
import {
  CheckResult,
  checkPortListening,
} from '@start9labs/start-sdk/lib/health/checkFns'
import { ExpectedExports } from '@start9labs/start-sdk/lib/types'
import { HealthReceipt } from '@start9labs/start-sdk/lib/health/HealthReceipt'
import { Daemons } from '@start9labs/start-sdk/lib/mainFn/Daemons'
import { sdk } from '../sdk'
import { uiPort } from './interfaces'

export const main: ExpectedExports.main = sdk.setupMain(
  async ({ effects, utils, started }) => {
    /**
     * ======================== Setup ========================
     */

    console.info('Starting Filebrowser...')

    /**
     * ======================== Additional Health Checks (optional) ========================
     */
    const healthReceipts: HealthReceipt[] = []

    /**
     * ======================== Daemons ========================
     *
     * In this section, you will create one or more daemons that define the service runtime
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
            effects.runCommand('filebrowser version'),
            checkPortListening(effects, uiPort, {
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
