import React, { Component } from 'react';
import axios from 'axios';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../api';
import { link } from 'fs';
// import './AddCountry.css';


class NewEventPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      subtitle: "",
      tagline: "",
      promo: "",
      startingDate: '',
      endingDate: '',
      dates: [],
      showtimes: [],
      _movies: [],
      movieDate: '',
      movieShowtime: '',
      movieId: ''
    }
  }

  // handleInputChange(eventFieldName, e) {
  //   console.log( e.target.value )
  //   let newEvent = {}
  //   newEvent[eventFieldName] = e.target.value
  //   this.setState(newEvent)
  // }

  handleChange(e) {
    //console.log(`${e.target.name} is type -->`, e.target.type);
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(`Changing this.state[${e.target.name}]`, this.state[e.target.name] );
  }

  handleChangeMovieDetails(e) {
    e.preventDefault();
    console.log( "MOVIE DETAILS -->", e.target.value )
    if (e.target.name === 'dates') {
        
    } else if ( e.target.name === 'showtimes' ) {
      
    } else if (e.target.name === '_movies') {
      
    }
    console.log( "DATES -->", this.state.dates );
    console.log( "SHOWTIMES -->", this.state.showtimes );
    console.log( "_MOVIES -->", this.state._movies );
  }

  handleAddMovieToEvent(e){
    e.preventDefault();

    this.setState({
      dates: [ ...this.state.dates, this.state.movieDate ],
      movieDate: '',
      showtimes: [ ...this.state.showtimes, this.state.movieShowtime ],
      movieShowtime: '',
      _movies: [ ...this.state._movies, this.state.movieId ],
      movieId: ''
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = {
      title: this.state.title,
      subtitle: this.state.subtitle,
      tagline: this.state.tagline,
      promo: this.state.promo,
      startingDate: this.state.startingDate,
      endingDate: this.state.endingDate,
      dates: this.state.dates,
      showtimes: this.state.showtimes,
      _movies: this.state._movies
    }
    
    api.postEvents( data )
    .then( response => {
      console.log( "New Event successfully added!", response );
      this.setState({
        title: '',
        subtitle: '',
        tagline: '',
        promo: '',
        startingDate: '',
        endingDate: '',
        dates: [],
        showtimes: [],
        _movies: []
      })
    })

  }

  render() {
    console.log( "THIS STATE --> ", this.state )
    return (
      <div className="NewEventPanel">
        <h2>Create New Event</h2>

        <div className="row border rounded p-2">
          <div className="col-md-6">

            <form className="form needs-validation" onSubmit={this.handleSubmit.bind(this)} novalidate>
          
              <div className="form-group m-1">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  placeholder="Enter Event Title"
                  onChange={this.handleChange.bind(this)}
                  required
                />
              </div>

              <div className="form-group m-1">
                <input
                  type="text"
                  className="form-control"
                  id="subtitle"
                  name="subtitle"
                  placeholder="Enter Event Subtitle"
                  onChange={this.handleChange.bind(this)}
                />
              </div>

              <div className="form-group m-1">
                <input
                  type="text"
                  className="form-control"
                  id="tagline"
                  name="tagline"
                  placeholder="Enter Event Tagline"
                  onChange={this.handleChange.bind(this)}
                />
              </div>

              <div className="form-group m-1">
                <input
                  type="text"
                  className="form-control"
                  id="promo"
                  name="promo"
                  placeholder="Enter Event Promo"
                  onChange={this.handleChange.bind(this)}
                />
              </div>

              <div className="form-group m-1">
                <label>Starting Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="startingDate"
                  name="startingDate"
                  placeholder="Starting Date"
                  onChange={this.handleChange.bind(this)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Ending Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="endingDate"
                  name="endingDate"
                  placeholder="Ending Date"
                  onChange={this.handleChange.bind(this)}
                  required
                />
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-success">
                  Create Event
                </button>
              </div>

            </form>

          </div>
          <div className="col-md-6">
            <form className="form border rounded" onSubmit={this.handleAddMovieToEvent.bind(this)}>
              
              <h6>Add a movie</h6>
              
              <div className="form-group m-1">
                <input
                  type="date"
                  className="form-control"
                  id="movieDate"
                  name="movieDate"
                  value={this.state.movieDate}
                  onChange={this.handleChange.bind(this)}
                  required
                />
              </div>

              <div className="form-group m-1">
                <input
                  type="text"
                  className="form-control"
                  id="movieShowtime"
                  name="movieShowtime"
                  value={this.state.movieShowtime}
                  placeholder="Enter showtime for this movie"
                  onChange={this.handleChange.bind(this)}
                  required
                />
              </div>

              <select id="movieId" name="movieId" className="form-control" onChange={this.handleChange.bind(this)} value={this.state.movieId} required>
                <option value='Select a movie'>Select a movie</option>
                { 
                  this.props.movies.sort((a,b) => {
                    if(a.title < b.title) return -1;
                    if(a.title > b.title) return 1;
                    return 0
                  }).map(movie => {
                    return <option key={movie._id} value={movie._id}>{ movie.title }</option>
                  })
                }
              </select>
              <div className="form-group m-1">
                <button type="submit" className="btn btn-outline-secondary">Add Movie</button>
              </div>
            </form>
            <div className="event-details">
              {
                this.state._movies &&
                this.state._movies.map( (element, index) => {
                  return (
                    <div key={element} className="border rounded my-2 bg-secondary text-white">
                      <b>Date:</b> { this.state.dates[index] }<br />
                      <b>Showtime</b> { this.state.showtimes[index] }
                      <h6>{ this.props.movies.find( movie => movie._id === element ).title }</h6>
                    </div>
                  )
                } ) 
              }
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default NewEventPanel;