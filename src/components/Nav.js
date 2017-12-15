var React = require('react');
var NavLink = require('react-router-dom').NavLink;

function Nav () {
  return (
    <ul className='nav'>
      <li>
        <NavLink exact activeClassName='active' to='/'>Home</NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/projects'>Projects</NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/devices'>Devices</NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/ipam'>IPAM</NavLink>
      </li>
    </ul>
  )
}

module.exports = Nav;
