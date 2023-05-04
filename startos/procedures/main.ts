import {} from '@start9labs/start-sdk/lib/health'
import {
  CheckResult,
  checkPortListening,
} from '@start9labs/start-sdk/lib/health/checkFns'
import { setupMain } from '@start9labs/start-sdk/lib/mainFn'
import exportInterfaces from '@start9labs/start-sdk/lib/mainFn/exportInterfaces'
import { ExpectedExports } from '@start9labs/start-sdk/lib/types'
import { WrapperData } from '../wrapperData'
import { HealthReceipt } from '@start9labs/start-sdk/lib/health/HealthReceipt'
import { Daemons } from '@start9labs/start-sdk/lib/mainFn/Daemons'
import { NetworkInterfaceBuilder } from '@start9labs/start-sdk/lib/mainFn/NetworkInterfaceBuilder'

export const main: ExpectedExports.main = setupMain<WrapperData>(
  async ({ effects, utils, started }) => {
    /**
     * ======================== Setup ========================
     *
     * In this section, you will fetch any resources or run any commands necessary to run the service
     */

    /**
     * ======================== Interfaces ========================
     *
     * In this section, you will decide how the service will be exposed to the outside world
     *
     * Naming convention reference: https://developer.mozilla.org/en-US/docs/Web/API/Location
     */

    // ------------ Tor ------------

    // Find or generate a random Tor hostname by ID
    const torHostname1 = utils.torHostName('torHostname1')

    // Create a Tor host with the assigned port mapping
    const torHost1 = await torHostname1.bindTor(80, 80)
    // Assign the Tor host a web protocol (e.g. "http", "ws")
    const torOrigin1 = torHost1.createOrigin('http')

    // ------------ LAN ------------

    // Create a LAN host with the assigned internal port
    const lanHost1 = await utils.bindLan(80)
    // Assign the LAN host a web protocol (e.g. "https", "wss")
    const lanOrigins1 = lanHost1.createOrigins('http')

    // ------------ Interface ----------------

    // An interface is a grouping of addresses that expose the same resource (e.g. a UI or RPC API).
    // Addresses are different "routes" to the same destination

    // Define the Interface for user display and consumption
    const iFace1 = new NetworkInterfaceBuilder({
      effects,
      name: 'Web UI',
      id: 'webui',
      description: 'Serves the Web UI via HTTP.',
      ui: true,
      basic: null,
      path: '',
      search: {},
    })

    // Choose which origins to attach to this interface. The resulting addresses will share the attributes of the interface (name, path, search, etc)
    const addressReceipt1 = await iFace1.export([
      torOrigin1,
      ...lanOrigins1.ip,
      lanOrigins1.local,
    ])

    // Export all address receipts for all interfaces to obtain interface receipt
    const interfaceReceipt = exportInterfaces(addressReceipt1)

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
      interfaceReceipt, // Provide the interfaceReceipt to prove it was completed
      healthReceipts, // Provide the healthReceipts or [] to prove they were at least considered
    })
      .addDaemon('lighttpd', {
        command: 'lighttpd -f /etc/lighttpd/httpd.conf', // The command to start the daemon
        ready: {
          display: null,
          // The function to run to determine the health status of the daemon
          fn: () =>
            checkPortListening(effects, 80, {
              successMessage: 'The web interface is ready',
              errorMessage: 'The web interface is not ready',
            }),
        },
        requires: [],
      })
      .addDaemon('filebrowser', {
        command: 'filebrowser --disable-exec=true', // The command to start the daemon
        ready: {
          display: 'Filebrowser is ready',
          // The function to run to determine the health status of the daemon
          fn: async () =>
            Promise.all([
              effects.runCommand('filebrowser version'),
              checkPortListening(effects, 8080, {
                successMessage: 'The web interface is ready',
                errorMessage: 'The web interface is not ready',
              }),
            ])
              .then(() => ({ status: 'passing' } as CheckResult))
              .catch(() => ({ status: 'failing' } as CheckResult)),
        },
        requires: ['lighttpd'],
      })
  },
)
