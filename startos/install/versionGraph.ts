import { VersionGraph } from '@start9labs/start-sdk'
import { current, other } from './versions'
import { configDefaults } from '../utils'
import { settingsJson } from '../fileModels/settings.json'

export const versionGraph = VersionGraph.of({
  current,
  other,
  preInstall: async (effects) => {
    await settingsJson.write(effects, configDefaults)
  },
})
