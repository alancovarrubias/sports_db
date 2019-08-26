import React from 'react'
import qs from 'query-string'
import { connect } from 'react-redux'
import { DEFAULT_SPORT } from '../const'
import actions from '../actions'
import { selectSport, selectDatabase } from '../selectors'
import { fetchData } from '../actions/async'

export default function withDatabase(WrappedComponent) {
  class With extends React.Component {
    componentDidMount() {
      const { queryParams: { sport }, match, history } = this.props
      this.props.fetchData(match)
      if (sport) {
        this.props.dispatch(actions.toggleSport(sport))
      } else {
        history.push({
          pathname: match.url,
          search: `?sport=${DEFAULT_SPORT}`,
        })
      }
    }

    componentDidUpdate(prevProps) {
      if (prevProps.sport !== this.props.sport) {
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
      queryParams: qs.parse(ownProps.location.search),
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
