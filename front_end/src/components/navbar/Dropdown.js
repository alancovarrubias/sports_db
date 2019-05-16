import React  from 'react';

const Dropdown = ({ title, links, onClick }) => {
  return (
        <div className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            { title }
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            { links.map(link => <a key={link.id} className="dropdown-item" onClick={() => onClick(link.data)}>{link.text}</a>) }
          </div>
        </div>
      );
};

export default Dropdown;
