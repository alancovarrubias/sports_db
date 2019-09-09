import dataActions from './data'
import asyncActions from './async'

export const data = dataActions
export const async = asyncActions

export default {
  ...data,
  ...async,
}

