import asyncActions from './async'
import modelActions from './model'
import selectActions from './select'

export const async = asyncActions
export const model = modelActions
export const select = selectActions

export default {
  ...asyncActions,
  ...modelActions,
  ...selectActions,
}

