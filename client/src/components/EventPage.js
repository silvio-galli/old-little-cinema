import React, { Component } from 'react';
import api from '../api';

class EventPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      event: {}
    }
  }

  componentDidMount() {
    api.getEvent(this.props.match.params.eventId)
    .then( event => {
      this.setState({
        event: event
      })
    })
    .catch(err => { throw err } );
  }

  render() {
    console.log( "EVENT inside EventPage --->", this.state.event )
    return this.state.event && (
      <div>
        <h1>{ this.state.event.title }</h1>
      </div>
    )
  }
}

export default EventPage;