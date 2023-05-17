import { setupActions } from '@start9labs/start-sdk/lib/actions/setupActions'
import { resetRootUser } from './resetRootUser'

/**
 * Add each new Action as the next argument to this function
 */
export const { actions, actionsMetadata } = setupActions(resetRootUser)
