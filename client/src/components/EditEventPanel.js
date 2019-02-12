import React, { Component } from 'react';
import api from '../api';
import helper from '../helpers'
import ReviewForm from './ReviewForm'
import OneMovieForm from './OneMovieForm'

class EditEventPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      kind: "",
      public: null,
      title: "",
      subtitle: "",
      tagline: "",
      promo: "",
      dates: [],
      showtimes: [],
      _movies: [],
      movieDate: '',
      movieShowtime: '',
      movieId: '',
      _movie: ''
    }

    this._handleInputChange = this._handleInputChange.bind(this)
    this._handleAddMovieToEvent = this._handleAddMovieToEvent.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
    this._deleteShow = this._deleteShow.bind(this)
  }

  componentDidMount() {
    api.getEvent(this.props.eventId)
    .then( event => {
      this.setState({
        oldEvent: event
      })
      return event
    })
    .then (event => {
      Object.keys(event).map(key => {
        switch(key) {
          case '_movies':
            this.setState({
              [key]: event[key].map(event => event._id)
            })
            break
          default:
            this.setState({
              [key]: event[key]
            })
        }
        return false
      })
    })
    .catch(err => { throw err } );
  }

  render() {
    let details = []
    if (this.state.kind && this.state.kind === "review") {
      this.state._movies && this.state._movies.map( (_movieId, index) => {
        return details.push(
          <div key={_movieId} className="border rounded my-2 p-2 bg-secondary text-white">
            <h5 className="no-underline">
              { this.props.movies.concat(this.state.oldEvent._movies).find( movie => movie._id === _movieId ).title }
            </h5>
            <b>Date:</b> { this.state.dates[index] }<br />
            <b>Showtime</b> { this.state.showtimes[index] }<br />
            <button
              className="btn btn-danger btn-sm mb-1"
              onClick={() => this._deleteShow(index)}
            >
              Delete
            </button>
          </div>
        )
      })
    } else {
      this.state.movieId ? console.log("movieID --->", this.state.movieId) : console.log("No movie id")
      if (!this.state.movieId && this.state.oldEvent)
        details.push(<h6 key={this.state.movieId}>{ this.state.oldEvent._movie.title }</h6>)
      else if (this.state.movies)
      details.push(<h6 key={this.state.movieId}>{ this.state.movies.find(m => m._id === this.state.movieId).title }</h6>)

      this.state.dates && this.state.dates.map( (element, index) => {
        return details.push(
          <div key={`${element}-${index}`} className="border rounded my-2 bg-secondary text-white">
            <b>Date:</b> { this.state.dates[index] }<br />
            { this.state.showtimes && <span>{ this.state.showtimes[index] }</span> }<br />
            <button
              className="btn btn-danger btn-sm mb-1"
              onClick={() => this._deleteShow(index)}
            >
              Delete
            </button>
          </div>
        )
      })
    }
    
    return (
      <div className="EditEventPanel">
        <h2>Edit Event {this.state._id}</h2>

        <div className="row border rounded p-2">
          <div className="col-md-6">
            {/* FIRST FORM starts here */}
            <form className="form needs-validation" onSubmit={this._handleSubmit} noValidate>

              <div className="form-group m-1">
                <select name="kind" id="kind" className="form-control" onChange={this._handleInputChange} required>
                  <option value="">Select the event type</option>
                  {
                    ["premiere", "review", "preview", "one-show"].map(k => {
                      if (k === this.state.kind) {
                        return <option key={k} value={k} selected >{k}</option>
                      } else {
                        return <option key={k} value={k}>{k}</option>
                      }
                    })
                  }
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
                  value={this.state.title || '' }
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
                  value={this.state.subtitle || '' }
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
                  value={this.state.tagline || '' }
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
                  value={this.state.promo || '' }
                />
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-success">
                  Update Event
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
                // TODO: after pinned movies problem with updating
                // 
                movies={helper.merge(this.props.movies, this.state.oldEvent._movies)}
                handleChange={this._handleInputChange}
                handleAddMovieToEvent={this._handleAddMovieToEvent}
                movieDate={this.state.movieDate}
                movieShowtime={this.state.movieShowtime}
                movieId={this.state.movieId}
              />
            }

            {
              this.state.kind && this.state.kind !== "review" &&
              <OneMovieForm
                // TODO: after pinned movies problem with updating
                //
                movies={helper.merge(this.props.movies, [this.state.oldEvent._movie])}
                handleChange={this._handleInputChange}
                handleAddMovieToEvent={this._handleAddMovieToEvent}
                movieDate={this.state.movieDate}
                movieShowtime={this.state.movieShowtime}
                _movie={this.state._movie}
              />
            }

            {/* SECOND FORM ends here */}

            {
              details &&
              <div className="event-details">
                { details }
              </div>
            }
          </div>
        </div>
        
      </div>
    )
  }


  //
  _handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  //
  _handleAddMovieToEvent(e){
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

  //
  _deleteShow(i) {
    this.setState({
      dates:[...this.state.dates.slice(0, i), ...this.state.dates.slice(i+1)],
      showtimes:[...this.state.showtimes.slice(0, i), ...this.state.showtimes.slice(i+1)],
      _movies:[...this.state._movies.slice(0, i), ...this.state._movies.slice(i+1)]
    })
  }

  //
  _handleSubmit(e) {
    e.preventDefault();
    let data = {
      _id: this.state._id,
      public: this.state.public,
      kind: this.state.kind,
      title: this.state.title,
      subtitle: this.state.subtitle,
      tagline: this.state.tagline,
      promo: this.state.promo,
      dates: this.state.dates,
      showtimes: this.state.showtimes,
    }

    if (data.kind === "review") {
      data._movies = this.state._movies
    } else {
      data._movie = this.state.movieId || this.state._movie._id
      data._movies = []
    }

    api.updateEvents( data )
    .then( response => {
      let {updated} = response 
      // update list of events in parent component
      this.props.updateEvents(updated)
      // mount the preview component
      this.props.setPanelToDisplay('PREVIEW_EVENT_PANEL', updated._id)
    })
  }
}

export default EditEventPanel;