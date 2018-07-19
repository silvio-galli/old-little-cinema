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
    let startingDate = new Date( Date.parse(this.state.event.startingDate) ).toDateString();
    let endingDate = new Date(Date.parse(this.state.event.endingDate) ).toDateString();

    return this.state.event && (
      <div>
        <h1>{ this.state.event.title }</h1>
        <h2>{ this.state.event.subtitle }</h2>
        <h3>{ this.state.event.tagline }</h3>
        <h4>{ this.state.event.promo }</h4>
        <p>
          <b>Starting Date:</b> { startingDate }
          <b>Ending Date:</b> { endingDate }
        </p>
        
        <div className="event-details border rounded p-2">
          {
            this.state.event._movies &&
            this.state.event._movies.map( (movie, index) => {
              return (
                <div key={movie._id} className="border rounded my-2 bg-light">
                  <b>Date:</b> { this.state.event.dates[index] }<br />
                  <b>Showtime</b> { this.state.event.showtimes[index] }
                  <h4>{ movie.title }</h4>
                </div>
              )
            } ) 
          }
        </div>

      </div>
    )
  }
}

export default PreviewEventPanel;