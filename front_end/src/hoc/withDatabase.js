import React from 'react'
import qs from 'query-string'
import { connect } from 'react-redux'
import { data } from '../actions'
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
      if (prevProps.sport !== this.props.sport || prevProps.period !== this.props.period) {
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
