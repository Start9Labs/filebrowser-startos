import { settingsJson } from '../fileModels/settings.json'
import { storeJson } from '../fileModels/store.json'
import { sdk } from '../sdk'

export const seedFiles = sdk.setupOnInit(async (effects) => {
  await settingsJson.merge(effects, {})
  await storeJson.merge(effects, {})
})
