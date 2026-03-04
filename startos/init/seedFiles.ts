import { settingsJson } from '../fileModels/settings.json'
import { sdk } from '../sdk'

export const seedFiles = sdk.setupOnInit(async (effects, kind) => {
  if (kind !== 'install') return

  await settingsJson.merge(effects, {})
})
