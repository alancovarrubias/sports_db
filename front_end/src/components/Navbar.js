import React from 'react'
import Dropdown from './common/Dropdown'
import { SPORTS, PERIODS } from '../const'

import './Navbar.css'

const NavbarComponent = ({ sport, seasons, brandClick, seasonGamesClick, toggleSport, selectPeriod }) => {
  const uppercaseSport = sport.toUpperCase()
  const seasonGamesDropdown = {
    title: "Seasons",
    links: seasons.map(season => ({
      id: season.id,
      text: season.year,
      data: season,
    })),
    onClick: seasonGamesClick,
  }
  const sportsDropdown = {
    title: "Sports",
    links: SPORTS.map((sport, index) => ({
      id: index,
      text: sport.toUpperCase(),
      data: sport,
    })),
    onClick: toggleSport,
  }
  const periods = PERIODS[sport]
  const options = Object.keys(periods).map(key => <option key={key} value={key}>{periods[key]}</option>)
  return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button className="navbar-brand" onClick={brandClick}>{ uppercaseSport } Database</button>
          <ul className="navbar-nav">
            <Dropdown dropdown={sportsDropdown} onClick={toggleSport} />
          </ul>
          <ul className="navbar-nav">
            <Dropdown dropdown={seasonGamesDropdown} onClick={seasonGamesClick} />
          </ul>
          <form className="navbar-search ml-auto mr-5">
            <div>
              Period:
              <select style={{height: '34px'}} className="form-control" onChange={selectPeriod}>
                {options}
              </select>
            </div>
          </form>
        </nav>
      )
}

export default NavbarComponent
