import { sdk } from '../../sdk'
import { setInterfaces } from '../interfaces'
import { configSpec } from './spec'

/**
 * This function executes on config save
 *
 * Use it to persist config data to various files and to establish any resulting dependencies
 */
export const save = sdk.setupConfigSave(
  configSpec,
  async ({ effects, utils, input, dependencies }) => {
    return {
      interfacesReceipt: await setInterfaces({ effects, utils, input }), // This is plumbing, don't touch it
      dependenciesReceipt: await effects.setDependencies([]),
      restart: true,
    }
  },
)
