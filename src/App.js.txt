import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import signup from './signup';
import firstpage from './firstpage';
import './App.css';
import userfirstpage from './userfirstpage';

class App extends Component {
  render() {
    return (
      <Router>
      
        <div>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <ul className="nav navbar-nav">
              <li ><Link to={'/'}>Home</Link></li>
              <li><Link to={'/Login'}>Login</Link></li>
            </ul>
          </div>
        </nav>
       
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/Login' component={Login}/>
            <Route exact path='/signup' component={signup}/>
            <Route exact path='/firstpage' component={firstpage}/>
            <Route exact path='/userfirstpage' component={userfirstpage}/>
          </Switch>
          </div>
       
        
      </Router>
    );
  }
}
export default App;