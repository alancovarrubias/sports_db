import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectPeriod } from '../actions'
import NavbarComponent from '../components/navbar/Navbar'

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.brandClick = this.brandClick.bind(this);
    this.gameClick = this.gameClick.bind(this);
  }

  brandClick() {
    const { router } = this.props;
    router.navigate({ name: "Seasons" });
  }

  gameClick(season) {
    const { router } = this.props;
    router.navigate({ name: "Games", params: { seasonId: season.id } });
  }

  render() {
    const links = this.props.seasons.map(season => {
      const id = season.id;
      const text = season.year;
      const data = season;
      return {
        id,
        text,
        data
      };
    });
    const dropdown = { title: "Games", links };
    return (<NavbarComponent {...this.props} brand="NBA Database" dropdown={dropdown} brandClick={this.brandClick} gameClick={this.gameClick}/>);
  }
}

function mapStateToProps(state) {
  const { seasons, period } = state;
  return {
    seasons,
    period
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectPeriod: (event) => dispatch(selectPeriod(event.target.value))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
