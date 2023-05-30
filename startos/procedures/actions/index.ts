import { setupActions } from '@start9labs/start-sdk/lib/actions/setupActions'
import { resetRootUser } from './resetRootUser'

export const { actions, actionsMetadata } = setupActions(resetRootUser)
