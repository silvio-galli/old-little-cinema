import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Admin from './Admin';
import Login from './Login';
import Signup from './Signup';
import MoviePage from './MoviePage';
import EventPage from './EventPage';
import api from '../api';
import logo from '../logo.svg';
import './App.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';

  
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
    api.loadUser();
  }
  
  handleLogoutClick(e) {
    api.logout()
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  
  render() {                
    return (
      <div className="App">
      <Navbar color="light" light expand="md">
          <NavbarBrand href="/">
            <img src={logo} className="App-logo" alt="logo" style={{height: 35}} />
            Old Little Cinema
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle.bind(this)} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                {!api.isLoggedIn() && <NavLink href="/signup">Signup</NavLink> }
              </NavItem>
              <NavItem>
                {!api.isLoggedIn() && <NavLink href="/login">Login</NavLink> }
              </NavItem>
              <NavItem>
                {api.isLoggedIn() && <NavLink href="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</NavLink> }
              </NavItem>
              <NavItem>
                <NavLink href="/admin">Admin</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Switch>
          <Route path="/" exact component={Home} />
          {/* <Route path="/countries" component={Countries} /> */}
          {/* <Route path="/add-country" component={AddCountry} /> */}
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/admin" exact component={Admin} />
          <Route path="/movies/:movieId" component={MoviePage} />
          <Route path="/events/:eventId" component={EventPage} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
