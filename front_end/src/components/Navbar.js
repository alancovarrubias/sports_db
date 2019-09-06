import React from 'react'
import Dropdown from './common/Dropdown'
import './Navbar.css'

const NavbarComponent = ({ sport, brandClick, sportsDropdown, selectSport, selectPeriod, periods }) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <button className="navbar-brand" onClick={brandClick}>{ sport } Database</button>
    <Dropdown dropdown={sportsDropdown} onClick={selectSport} />
    <form className="navbar-search ml-auto mr-5">
      <div>
        Period:
        <select className="form-control" onChange={selectPeriod}>
          {Object.keys(periods).map(key => <option key={key} value={key}>{periods[key]}</option>)}
        </select>
      </div>
    </form>
  </nav>
)

export default NavbarComponent
/*
  const seasonGamesDropdown = {
    title: "Seasons",
    links: seasons.map(season => ({
      id: season.id,
      text: season.year,
      data: season,
    })),
    onClick: seasonGamesClick,
  }
  <Dropdown dropdown={seasonGamesDropdown} onClick={seasonGamesClick} />
 */
