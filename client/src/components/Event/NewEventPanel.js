import React, { Component } from 'react'
import ReviewForm from '../ReviewForm'
import OneMovieForm from '../OneMovieForm'
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../../api'
import { displayTimes } from '../../helpers'

class NewEventPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      kind: "",
      title: "",
      subtitle: "",
      tagline: "",
      promo: "",
      dates: [],
      showtimes: [],
      _movies: [],
      isOriginalTrack: [],
      movieDate: '',
      movieShowtime: '',
      movieId: ''
    }

    this._handleInputChange = this._handleInputChange.bind(this)
  }

  // handleChangeMovieDetails(e) {
  //   e.preventDefault();
  //   console.log( "MOVIE DETAILS -->", e.target.value )
  //   if (e.target.name === 'dates') {
        
  //   } else if ( e.target.name === 'showtimes' ) {
      
  //   } else if (e.target.name === '_movies') {
      
  //   }
  //   console.log( "DATES -->", this.state.dates );
  //   console.log( "SHOWTIMES -->", this.state.showtimes );
  //   console.log( "_MOVIES -->", this.state._movies );
  // }

  handleAddMovieToEvent(e){
    e.preventDefault();
    if (this.state.kind === "review") {
      this.setState({
        dates: [ ...this.state.dates, this.state.movieDate ],
        movieDate: '',
        showtimes: [ ...this.state.showtimes, this.state.movieShowtime ],
        movieShowtime: '',
        _movies: [ ...this.state._movies, this.state.movieId ],
        movieId: ''
      })
    } else {
      this.setState({
        dates: [ ...this.state.dates, this.state.movieDate ],
        movieDate: '',
        showtimes: [ ...this.state.showtimes, this.state.movieShowtime ],
        movieShowtime: ''
        // _movie: this.state.movieId,
        // movieId: ''
      })
    }
  }

  render() {
    let details = []
    if (this.state.kind && this.state.kind === "review") {
      this.state._movies && this.state._movies.map( (element, index) => {
        return details.push(
          <div key={element} className="border rounded my-2 bg-secondary text-white">
            <h5 className="no-underline">
              { this.props.movies.find( movie => movie._id === element ).title }
            </h5>
            <b>Date:</b> { this.state.dates[index] }<br />
            <b>Showtime</b> { displayTimes(this.state.showtimes[index]) }
          </div>
        )
      })
    } else {
      this.state.movieId && details.push(<h6 key={this.state.movieId}>{ this.props.movies.find(movie => movie._id === this.state.movieId).title }</h6>)
      this.state.dates && this.state.dates.map( (element, index) => {
        return details.push(
          <div key={`${element}-${index}`} className="border rounded my-2 bg-secondary text-white">
            <b>Date:</b> { this.state.dates[index] }<br />
            <b>Showtime</b> { displayTimes(this.state.showtimes[index]) }
          </div>
        )
      })
    }
    
    return (
      <div className="NewEventPanel">
        <h2>Create New Event</h2>

        <div className="row border rounded p-2">
          <div className="col-md-6">
            {/* FIRST FORM starts here */}
            <form className="form needs-validation" onSubmit={this._handleSubmit.bind(this)} noValidate>

              <div className="form-group m-1">
                <select name="kind" id="kind" className="form-control" onChange={this._handleInputChange} required>
                  <option value="">Select the event type</option>
                  <option value="premiere">premiere</option>
                  <option value="review">review</option>
                  <option value="preview">preview</option>
                  <option value="one-show">one-show</option>
                </select>
              </div>

              <div className="form-group m-1">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  placeholder="Enter Event Title"
                  onChange={this._handleInputChange}
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
                  onChange={this._handleInputChange}
                />
              </div>

              <div className="form-group m-1">
                <input
                  type="text"
                  className="form-control"
                  id="tagline"
                  name="tagline"
                  placeholder="Enter Event Tagline"
                  onChange={this._handleInputChange}
                />
              </div>

              <div className="form-group m-1">
                <input
                  type="text"
                  className="form-control"
                  id="promo"
                  name="promo"
                  placeholder="Enter Event Promo"
                  onChange={this._handleInputChange}
                />
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-success">
                  Create Event
                </button>
              </div>

            </form>
            {/* FIRST FORM ends here */}

          </div>

          <div className="col-md-6">
            
            {/* SECOND FORM starts here */}
            {
              this.state.kind === "review" &&
              <ReviewForm
                movies={this.props.movies}
                handleChange={this._handleInputChange}
                handleAddMovieToEvent={this.handleAddMovieToEvent.bind(this)}
                movieDate={this.state.movieDate}
                movieShowtime={this.state.movieShowtime}
                movieId={this.state.movieId}
              />
            }

            {
              this.state.kind && this.state.kind !== "review" &&
              <OneMovieForm
                movies={this.props.movies}
                handleChange={this._handleInputChange}
                handleAddMovieToEvent={this.handleAddMovieToEvent.bind(this)}
                movieDate={this.state.movieDate}
                movieShowtime={this.state.movieShowtime}
                movieId={this.state.movieId}
              />
            }

            {/* SECOND FORM ends here */}

            <div className="event-details">
              { details }
            </div>
          </div>
        </div>
        
      </div>
    );
  }

  //
  _handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  //
  _handleSubmit(e) {
    e.preventDefault();
    let data = {
      kind: this.state.kind,
      title: this.state.title,
      subtitle: this.state.subtitle,
      tagline: this.state.tagline,
      promo: this.state.promo,
      dates: this.state.dates,
      showtimes: this.state.showtimes,
    }

    if (data.kind === "review")
      data._movies = this.state._movies
    else
      data._movie = this.state.movieId

    api.postEvents( data )
    .then( response => {
      // add the new event in the parent component
      this.props.addEvent(response.newEvent)
      // mount the preview component
      this.props.setPanelToDisplay('PREVIEW_EVENT_PANEL', response.newEvent._id)
    })
  }
}

export default NewEventPanel;
