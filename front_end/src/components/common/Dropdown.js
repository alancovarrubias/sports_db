import React  from 'react'

const Dropdown = ({ dropdown: { title, links, onClick } }) => {
  return (
    <div className="nav-item dropdown">
      <button className="nav-link dropdown-toggle" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        { title }
      </button>
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        { links.map(link => <button key={link.id} className="dropdown-item" onClick={() => onClick(link.data)}>{link.text}</button>) }
      </div>
    </div>
  )
}

export default Dropdown
