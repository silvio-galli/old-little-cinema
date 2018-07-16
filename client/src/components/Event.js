import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Event extends Component {
  render() {
    return (
      <div>
        <Link to={`/events/${this.props.event._id}`}>{ this.props.event.title }</Link>
      </div>
    )
  }
}

export default Event;