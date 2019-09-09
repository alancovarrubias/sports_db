import dataActions from './data'
import routerActions from './router'
import asyncActions from './async'

export const data = dataActions
export const async = asyncActions
export const router = routerActions

export default {
  ...data,
  ...async,
  ...router,
}

