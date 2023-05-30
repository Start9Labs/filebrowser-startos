import { configSpec } from './spec'
import { sdk } from '../../sdk'

export const read = sdk.setupConfigRead(
  configSpec,
  async ({ effects, utils }) => {},
)
