import { acknowledgeEol } from '../actions/acknowledgeEol'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const eolNotice = sdk.setupOnInit(async (effects) => {
  const store = await storeJson.read().const(effects)

  if (!store?.eolAcknowledged) {
    await sdk.action.createOwnTask(effects, acknowledgeEol, 'critical', {
      reason: i18n(
        'Confirm that you understand File Browser is no longer maintained and see the replacements available to you.',
      ),
    })
  }
})
