import { VersionGraph } from '@start9labs/start-sdk'
import { current, other } from './versions'
import { configDefaults } from '../utils'
import { jsonFile } from '../fileModels/filebrowser.json'
import { mkdir } from 'fs/promises'

export const versionGraph = VersionGraph.of({
  current,
  other,
  preInstall: async (effects) => {
    await jsonFile.write(effects, configDefaults)
    await mkdir('/media/startos/volumes/main/files', { recursive: true })
  },
})
