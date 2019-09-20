import { createActions } from 'redux-actions'
import { push } from 'connected-react-router'
import metadata from './metadata'
import async from './async'

import api from '../api'

const authActions = createActions({
  SELECT_USER: user => ({ user }),
  CHANGE_USERNAME: username => ({ username }),
  CHANGE_PASSWORD: password => ({ password }),
})

const login = () => async (dispatch, getState) => {
  const { user } = getState()
  const response = await api.authenticate(user)
  if (response.status === 200) {
    const { auth_token, name, username } = await response.json()
    sessionStorage.setItem('jwtToken', auth_token)
    dispatch(authActions.selectUser({ name, username, password: "" }))
    dispatch(push('/seasons'))
  }
}

const logout = () => async (dispatch, getState) => {
  sessionStorage.removeItem('jwtToken')
  dispatch(authActions.changeUsername(''))
  dispatch(push('/login'))
}

const checkUser = (props) => async (dispatch, getState) => {
  const token = sessionStorage.getItem('jwtToken')
  if (!token || token === '') {
    dispatch(push('/login'))
    return
  }
  const response = await api.getUser(token)
  if (response.status === 200) {
    const { user: { username, name } } = await response.json()
    dispatch(authActions.selectUser({ name, username, password: "" }))
    dispatch(metadata.defaultValues(props))
    dispatch(async.fetchData(props))
  } else {
    dispatch(push('/login'))
  }
}

export default {
  ...authActions,
  checkUser,
  login,
  logout,
}
