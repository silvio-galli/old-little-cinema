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
        event: event
      })
    })
    .catch(err => { throw err } );
  }

  componentDidMount() {
    api.getEvent(this.props.eventId)
    .then( event => {
      this.setState({
        event: event
      })
    })
    .catch(err => { throw err } );
  }


  render() {
    console.log( "EVENT inside EventPage --->", this.state.event )
    let startingDate, endingDate;
    let details = []
    if (this.state.event.kind && this.state.event.kind === "review" ) {
      startingDate = this.state.event.dates && new Date( Date.parse(this.state.event.dates[0]) ).toDateString()
      endingDate = this.state.event.dates && new Date(Date.parse(this.state.event.dates[this.state.event.dates.length - 1]) ).toDateString()
      this.state.event._movies && this.state.event._movies.map( (movie, index) => {
        details.push(
          <div key={movie._id} className="border rounded my-2 bg-light">
            <h4>{ movie.title }</h4>
            <b>Date:</b> { this.state.event.dates[index] }<br />
            <b>Showtime</b> { this.state.event.showtimes[index] }
          </div>
        )
      })
    } else {
      startingDate = this.state.event.dates && new Date( Date.parse(this.state.event.dates[0]) ).toDateString()
      this.state.event.dates && this.state.event.dates.map( (date, index) => {
        details.push(
          <div key={`${date}-${index}`} className="border rounded my-2 bg-light">
            <b>Date:</b> { date }<br />
            <b>Showtime</b> { this.state.event.showtimes[index] }
          </div>
        )
      })
    }
    console.log("DETAILS ----->", details)

    return this.state.event && (
      <div>
        <h1>{ this.state.event.title }</h1>
        <h2>{ this.state.event.subtitle }</h2>
        <h3>{ this.state.event.tagline }</h3>
        <h4>{ this.state.event.promo }</h4>
        { (startingDate && endingDate)
          ?
          <p>
            <b>Starting Date:</b> { startingDate }
            <b>Ending Date:</b> { endingDate }
          </p>
          :
          <p>
            <b>From </b> { startingDate }
          </p>
        }
        
        <div className="event-details border rounded p-2">
          { details }
        </div>

      </div>
    )
  }
}

export default PreviewEventPanel;