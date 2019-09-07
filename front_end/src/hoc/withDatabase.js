import React from 'react'
import qs from 'query-string'
import { connect } from 'react-redux'
import { DEFAULT_SPORT, DEFAULT_PERIOD } from '../const'
import actions from '../actions'
import { selectSport, selectDatabase } from '../selectors'
import { fetchData } from '../actions/async'

export default function withDatabase(WrappedComponent) {
  class With extends React.Component {
    componentDidMount() {
      const { queryParams: { sport, period }, match } = this.props
      const initialSport = sport || DEFAULT_SPORT
      const initialPeriod = Number(period) || DEFAULT_PERIOD
      this.props.dispatch(actions.selectSport(initialSport))
      this.props.dispatch(actions.selectPeriod(initialPeriod))
      this.props.fetchData(match)
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

  const mapDispatchToProps = dispatch => {
    return {
      dispatch,
      fetchData: dataOptions => dispatch(fetchData(dataOptions)),
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(With)
}
