import React from 'react'
import { connect } from 'react-redux'

import * as _ from 'lodash'

import { async, select } from '../actions'
import { selectSport, selectDatabase, selectQueryParams } from '../selectors'

export default WrappedComponent => {
  class With extends React.Component {
    componentDidMount() {
      this.props.dispatch(select.defaultValues(this.props))
      this.props.dispatch(async.fetchData(this.props))
    }

    componentDidUpdate(prevProps) {
      if (!_.isEqual(this.props.queryParams, prevProps.queryParams)) {
        this.componentDidMount()
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  const mapStateToProps = (state, ownProps) => {
    return {
      sport: selectSport(state),
      selectbase: selectDatabase(state),
      queryParams: selectQueryParams(state.router)
    }
  }

  return connect(mapStateToProps)(With)
}
