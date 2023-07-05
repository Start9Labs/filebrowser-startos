import { V2_23_0_1 } from './V2_23_0_1'
import { sdk } from '../../sdk'

/**
 * Add each new migration as the next argument to this function
 */
export const migrations = sdk.setupMigrations(V2_23_0_1)
