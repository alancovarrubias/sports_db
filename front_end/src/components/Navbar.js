import React from 'react'
import Dropdown from './common/Dropdown'
import './Navbar.css'

const NavbarComponent = ({ sport, seasonsClick, sportsDropdown, selectSport, period, selectPeriod, periods, logout, user}) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <button className="navbar-brand" onClick={seasonsClick}>{ sport } Database</button>
    <Dropdown dropdown={sportsDropdown} onClick={selectSport} />
    <ul className="navbar-nav mx-auto">
      <li className="nav-item text-large">
        { user.name }
      </li>
    </ul>
    <form className="navbar-search mr-2">
      <div>
        Period:
        <select className="form-control" value={period}  onChange={selectPeriod}>
          {Object.keys(periods).map(key => <option key={key} value={key}>{periods[key]}</option>)}
        </select>
      </div>
    </form>
    <button className="navbar-brand" onClick={logout}>Logout</button>
  </nav>
)

export default NavbarComponent
