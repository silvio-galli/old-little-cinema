import React, { Component } from 'react';
import axios from 'axios';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../api';
// import './AddCountry.css';


class NewEventPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      capitals: "",
      area: "",
      description: "",
      message: null
    }
  }

  handleInputChange(stateFieldName, event) {
    let newState = {}
    newState[stateFieldName] = event.target.value
  
    this.setState(newState)
  }

  handleClick(e) {
    e.preventDefault()
    console.log(this.state.name, this.state.description)
    let data = {
      name: this.state.name,
      capitals: this.state.capitals,
      area: this.state.area,
      description: this.state.description,
    }
    api.postCountries(data)
      .then(result => {
        console.log('SUCCESS!')
        this.setState({
          name: "",
          capitals: "",
          area: "",
          description: "",
          message: `Your country '${this.state.name}' has been created`
        })
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 2000)
      })
      .catch(err => {
        console.log('ERROR')
      })
  }
  render() {                
    return (
      <div className="NewEventPanel">
        <h2>Create New Event</h2>

        <form className="form">
          
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder="Enter Event Title"
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="subtitle"
              name="subtitle"
              placeholder="Enter Event Subtitle"
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="tagline"
              name="tagline"
              placeholder="Enter Event Tagline"
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="promo"
              name="promo"
              placeholder="Enter Event Promo"
            />
          </div>

          <div className="form-group">
            <input
              type="date"
              className="form-control"
              id="startingDate"
              name="startingDate"
              placeholder="Starting Date"
            />
          </div>

          <div className="form-group">
            <input
              type="date"
              className="form-control"
              id="endingDate"
              name="endingDate"
              placeholder="Ending Date"
            />
          </div>

        </form>
      </div>
    );
  }
}

export default NewEventPanel;
