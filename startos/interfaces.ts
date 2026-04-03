import { sdk } from './sdk'
import { uiPort } from './utils'
import { i18n } from './i18n'

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const main = sdk.MultiHost.of(effects, 'main')
  const mainOrigin = await main.bindPort(uiPort, {
    protocol: 'http',
  })
  const ui = sdk.createInterface(effects, {
    name: i18n('Web UI'),
    id: 'ui',
    description: i18n('The web interface of File Browser'),
    type: 'ui',
    masked: false,
    schemeOverride: null,
    username: null,
    path: '',
    query: {},
  })

  const uiReceipt = await mainOrigin.export([ui])

  return [uiReceipt]
})
