import { sdk } from '../sdk'
import { resetAdminUser } from './resetAdminUser'
import { setExpiration } from './setExpiration'

export const actions = sdk.Actions.of()
  .addAction(setExpiration)
  .addAction(resetAdminUser)
