import React from 'react'
import { connect } from 'react-redux'
import qs from 'query-string'
import * as _ from 'lodash'

import { data } from '../actions'
import { QUERY_PARAMS } from '../const'
import { selectSport, selectDatabase } from '../selectors'
import { fetchData } from '../api'

export default (WrappedComponent) => {
  class With extends React.Component {
    componentDidMount() {
      const { queryParams, match } = this.props
      this.props.dispatch(data.defaultValues(queryParams))
      this.props.dispatch(fetchData(match))
    }

    componentDidUpdate(prevProps) {
      const prevQueryParams = _.pickBy(prevProps, (value, key) => QUERY_PARAMS.includes(key))
      const queryParams = _.pickBy(this.props, (value, key) => QUERY_PARAMS.includes(key))
      if (_.isEqual(queryParams, prevQueryParams)) {
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
      database: selectDatabase(state),
      queryParams: qs.parse(state.router.location.search),
    }
  }

  return connect(mapStateToProps)(With)
}
