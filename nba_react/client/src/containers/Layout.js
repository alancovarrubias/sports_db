import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSeasons } from '../actions'
import Navbar from './Navbar'

class Layout extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchSeasons());
  }

  render() {
    const { body:Body } = this.props.response;
    return (
          <div>
            <Navbar router={this.props.router}/>
            <Body {...this.props} />
          </div>
        );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
