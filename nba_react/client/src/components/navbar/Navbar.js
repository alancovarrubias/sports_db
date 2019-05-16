import React from 'react';
import Dropdown from './Dropdown';
import './Navbar.css'

import { PERIODS } from '../../const/periods';

const Navbar = ({ brand, dropdown, brandClick, gameClick, selectPeriod }) => {
  const options = Object.keys(PERIODS).map(period => <option key={period} value={period}>{PERIODS[period]}</option>);
  return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" onClick={brandClick}>{ brand }</a>
          <ul className="navbar-nav">
            <Dropdown title={dropdown.title} links={dropdown.links} onClick={gameClick} />
          </ul>
          <form className="navbar-search ml-auto mr-5">
            <div>
              Period:
              <select className="form-control" onChange={selectPeriod}>
                {options}
              </select>
            </div>
          </form>
        </nav>
      );
};

export default Navbar;
