import React, { Component } from 'react';
import api from '../api';

class Home extends Component {

  render() {
    let user = "test@test.com";
    let password = "password";
    return (
      <div className="Home">
        <h2>Home</h2>
        <p>This is a sample project with the MERN stack</p>
        {
          api.isLoggedIn()
          ? <p>Now that you are logged in you can go to <a href="/admin">Admin</a></p>
          : (
              <p>
                Go to <a href="/login">login</a> and use this credentials to access:
                <br />
                <strong>email: </strong>
                <span>{user}</span>
                <br />
                <strong>password: </strong>
                <span>{password}</span>
              </p>
            )
        }
      </div>
    );
  }
}

export default Home;
