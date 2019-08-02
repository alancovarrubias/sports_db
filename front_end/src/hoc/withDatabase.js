import React from 'react'
import { connect } from 'react-redux'
import { selectSport, selectDatabase } from '../selectors'
import { fetchData } from '../actions'

export default function withDatabase(WrappedComponent) {
  class With extends React.Component {
    componentDidMount() {
      this.props.fetchData(this.props.match)
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
  const mapStateToProps = state => {
    return {
      sport: selectSport(state),
      database: selectDatabase(state)
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      fetchData: dataOptions => dispatch(fetchData(dataOptions))
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(With)
}
