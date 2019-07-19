import React from 'react'
import { connect } from 'react-redux'
import { fetchData } from '../actions'

export default function withDatabase(WrappedComponent) {
  class With extends React.Component {
    componentDidMount() {
      const dataOptions = (({ match, database, sport }) => ({ match, database, sport }))(this.props)
      this.props.fetchData(dataOptions)
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  const mapStateToProps = state => {
    return {
      database: state[state.sport]
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      fetchData: dataOptions => dispatch(fetchData(dataOptions))
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(With)
}
