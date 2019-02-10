import React, { Component } from 'react';
import api from '../api';

class PreviewEventPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      event: {},
      movieList: []
    }
  }

  componentWillReceiveProps(nextProps) {
    api.getEvent(nextProps.eventId)
    .then( event => {
      this.setState({
        event
      })
    })
    .catch(err => { throw err } );
  }

  componentDidMount() {
    api.getEvent(this.props.eventId)
    .then( event => {
      this.setState({
        event
      })
    })
    .catch(err => { throw err } );
  }


  render() {
    let {_id, kind, title, subtitle, tagline, promo, dates, showtimes, _movies, _movie} = this.state.event
    let startingDate, endingDate;
    let details = []
    if (kind && kind === "review" ) {
      startingDate = dates && new Date( Date.parse(dates[0]) ).toDateString()
      endingDate = dates && new Date(Date.parse(dates[dates.length - 1]) ).toDateString()
      _movies && _movies.map( (movie, index) => {
        details.push(
          <div key={movie._id} className="my-2 p-2 border rounded bg-light movie-box">
            <div className="poster-box">
              <img src={movie.poster_path} alt=""/>
            </div>
            <p>
            <b>{ movie.title }</b><br />
            <b>Date:</b> { dates[index] }<br />
            <b>Showtime</b> { showtimes[index] }
            </p>
            <div className="clearfix"></div>
          </div>
        )
        return false
      })
    } else {
      startingDate = dates && new Date( Date.parse(dates[0]) ).toDateString()
      dates && dates.map( (date, index) => {
        details.push(
          <div key={`${date}-${index}`} className="my-2 p-2 border rounded bg-light">
            <b>Date:</b> { date }<br />
            <b>Showtime</b> { showtimes[index] }
          </div>
        )
        return false
      })
    }

    return this.state.event && (
      <div className="p-2 border text-left event-preview-box">
        <ul>
          {title && <li><b>Title:</b> { title }</li>}
          {subtitle && <li><b>Subtitle:</b> { subtitle }</li>}
          {tagline && <li><b>Tagline:</b> { tagline }</li>}
          {promo && <li><b>Promo:</b> { promo }</li>}
        </ul>
        { (startingDate && endingDate)
          &&
          <p>
            <b>Starting Date:</b> { startingDate }<br /> 
            <b>Ending Date:</b> { endingDate }
          </p>
        }

        {
          _movie &&
          <div className="my-2 p-2 border rounded movie-box">
            <div className="poster-box">
                <img src={_movie.poster_path} alt=""/>
              </div>
            <p>
              <b>Title: </b> { _movie.title }
              <b>From </b> { startingDate }
            </p>
            <div className="clearfix"></div>
          </div>
        }
        
        { details }

        <div className="actions">
          <button
            className="btn btn-outline-primary mr-2"
          >
            Publish
          </button>
          
          <button
            className="btn btn-outline-secondary mr-2"
            onClick={() => this.props.setPanelToDisplay('EDIT_EVENT_PANEL', _id)}
          >
            Edit
          </button>

          <button
            className="btn btn-outline-danger"
            onClick={() => this.props.deleteEvent(_id) }
          >
            Delete
          </button>
        </div>

      </div>
    )
  }
}

export default PreviewEventPanel;