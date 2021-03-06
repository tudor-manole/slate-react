import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import Devices from './Devices';
import IPAM from './IPAM';
import Projects from './Projects';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/projects' component={Projects} />
            <Route path='/devices' component={Devices} />
            <Route path='/ipam' component={IPAM} />
              <Route render={function () {
              return <p>Not Found</p>
            }} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
