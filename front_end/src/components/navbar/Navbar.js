import React from 'react';
import Dropdown from './Dropdown';
import './Navbar.css'

import { PERIODS } from '../../const/periods';

const Navbar = ({ sport, brandClick, gamesDropdown, gamesClick, sportsDropdown, sportsClick, selectPeriod }) => {
  const options = Object.keys(PERIODS).map(period => <option key={period} value={period}>{PERIODS[period]}</option>);
  return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" onClick={brandClick}>{ sport.toUpperCase() } Database</a>
          <ul className="navbar-nav">
            <Dropdown title={sportsDropdown.title} links={sportsDropdown.links} onClick={sportsClick} />
          </ul>
          <ul className="navbar-nav">
            <Dropdown title={gamesDropdown.title} links={gamesDropdown.links} onClick={gamesClick} />
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
      );
};

export default Navbar;
