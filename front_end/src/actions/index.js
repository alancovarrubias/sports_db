import asyncActions from './async'
import modelActions from './model'
import metadataActions from './metadata'

export const async = asyncActions
export const model = modelActions
export const metadata = metadataActions

export default {
  ...asyncActions,
  ...modelActions,
  ...metadataActions,
}

