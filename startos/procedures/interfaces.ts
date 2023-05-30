import { sdk } from '../sdk'
import { configSpec } from './config/spec'

export const uiPort = 8080
export const webUiInterfaceId = 'webui'

export const setInterfaces = sdk.setupInterfaces(
  configSpec,
  async ({ effects, utils, input }) => {
    const multi = utils.host.multi('multi') // technically just a multi hostname
    const multiOrigin = await multi.bindPort(uiPort, { protocol: 'http' })
    const multiInterface = utils.createInterface({
      name: 'Web UI',
      id: webUiInterfaceId,
      description: 'This is the ui for the filebrowser',
      hasPrimary: false,
      disabled: false,
      ui: true,
      username: null,
      path: '',
      search: {},
    })

    const multiReceipt = await multiInterface.export([multiOrigin])

    return [multiReceipt]
  },
)
