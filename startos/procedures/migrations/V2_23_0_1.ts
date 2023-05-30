import { sdk } from '../../sdk'
import { newPassword } from '../actions/resetRootUser'

export const V2_23_0_1 = sdk.Migration.of({
  version: '2.23.0.1',
  up: async ({ effects, utils }) => {
    await newPassword(null, utils, effects)
  },
  down: async ({ effects }) => {},
})
