import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const shape = z.object({
  eolAcknowledged: z.boolean().optional().catch(undefined),
})

export const storeJson = FileHelper.json(
  { base: sdk.volumes.config, subpath: 'startos.json' },
  shape,
)
