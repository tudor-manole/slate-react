var React = require('react');
var Link = require('react-router-dom').Link;

class Home extends React.Component {
  render() {
    return (
      <div className='home-container'>
        <h1>Slate: A Net-Eng Lab System</h1>
        <Link className='button' to='/devices'>Devices</Link>
      </div>
    )
  }
}

module.exports = Home;
