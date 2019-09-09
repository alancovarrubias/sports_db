import React from 'react'
import Dropdown from './common/Dropdown'
import './Navbar.css'

const NavbarComponent = ({ sport, seasonsClick, sportsDropdown, selectSport, period, selectPeriod, periods }) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <button className="navbar-brand" onClick={seasonsClick}>{ sport } Database</button>
    <Dropdown dropdown={sportsDropdown} onClick={selectSport} />
    <form className="navbar-search ml-auto mr-5">
      <div>
        Period:
        <select className="form-control" value={period}  onChange={selectPeriod}>
          {Object.keys(periods).map(key => <option key={key} value={key}>{periods[key]}</option>)}
        </select>
      </div>
    </form>
  </nav>
)

export default NavbarComponent
