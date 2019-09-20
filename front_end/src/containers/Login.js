import { connect } from 'react-redux'
import LoginComponent from '../components/Login'
import { auth } from '../actions'
import { selectUser } from '../selectors'

const mapStateToProps = (state) => {
  return {
    user: selectUser(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    usernameChange: (e) => dispatch(auth.changeUsername(e.target.value)),
    passwordChange: (e) => dispatch(auth.changePassword(e.target.value)),
    attemptLogin: () => dispatch(auth.login()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)
