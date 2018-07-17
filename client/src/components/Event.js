import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap'

class Event extends Component {
  render() {
    return (
      <Button outline color="primary" className="mr-2">
        {/* <a href={`/events/${this.props.event._id}`}> */}
          { this.props.event.title }
        {/* </a> */}
      </Button>
    )
  }
}

export default Event;