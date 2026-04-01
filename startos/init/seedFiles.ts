import { settingsJson } from '../fileModels/settings.json'
import { sdk } from '../sdk'

export const seedFiles = sdk.setupOnInit(async (effects) => {
  await settingsJson.merge(effects, {})
})
