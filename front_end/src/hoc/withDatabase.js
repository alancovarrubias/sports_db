import React from 'react'
import { connect } from 'react-redux'

import * as _ from 'lodash'

import { async, metadata, auth } from '../actions'
import { selectSport, selectQueryParams, selectUser } from '../selectors'

export default WrappedComponent => {
  class With extends React.Component {
    componentDidMount() {
      this.props.dispatch(auth.checkUser(this.props))
    }

    componentDidUpdate(prevProps) {
      if (!_.isEqual(this.props.queryParams, prevProps.queryParams)) {
        this.props.dispatch(metadata.defaultValues(this.props))
        this.props.dispatch(async.fetchData(this.props))
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  const mapStateToProps = (state, ownProps) => {
    return {
      user: selectUser(state),
      sport: selectSport(state),
      queryParams: selectQueryParams(state.router)
    }
  }

  return connect(mapStateToProps)(With)
}
