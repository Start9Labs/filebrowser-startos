import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { uiPort, dataPath, databasePath } from '../utils'

const shape = z
  .object({
    port: z.literal(uiPort).catch(uiPort),
    baseURL: z.literal('').catch(''),
    address: z.literal('0.0.0.0').catch('0.0.0.0'),
    log: z.literal('stdout').catch('stdout'),
    database: z
      .literal(`${databasePath}/filebrowser.db`)
      .catch(`${databasePath}/filebrowser.db`),
    root: z.literal(dataPath).catch(dataPath),
    tokenExpirationTime: z.string().catch('12h'),
  })
  .strip()

export const settingsJson = FileHelper.json(
  {
    base: sdk.volumes.config,
    subpath: 'settings.json',
  },
  shape,
)
