import asyncActions from './async'
import authActions from './auth'
import metadataActions from './metadata'
import modelActions from './model'

export const async = asyncActions
export const auth = authActions
export const metadata = metadataActions
export const model = modelActions

export default {
  ...asyncActions,
  ...authActions,
  ...metadataActions,
  ...modelActions,
}

