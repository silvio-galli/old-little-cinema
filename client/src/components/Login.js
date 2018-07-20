import React, { Component } from 'react';
import api from '../api';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
    }
  }

  handleInputChange(stateFieldName, event) {
    let newState = {}
    newState[stateFieldName] = event.target.value
  
    this.setState(newState)
  }

  handleClick(e) {
    e.preventDefault()
    api.login(this.state.email, this.state.password)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => {
        console.log('ERROR')
      })
  }

  render() {   
    return (
      <div className="Login">
        <h2>Login</h2>
        <form className="form mx-auto login-form">
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" type="text" value={this.state.email} onChange={(e) => {this.handleInputChange("email", e)}} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input className="form-control" type="password" value={this.state.password} onChange={(e) => {this.handleInputChange("password", e)}}  /> <br/>
          </div>
          <div className="form-group">
            <button type="submit" onClick={(e) => this.handleClick(e)} className="btn btn-success">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
