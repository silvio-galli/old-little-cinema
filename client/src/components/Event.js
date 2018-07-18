import React, { Component } from 'react';
import { Button } from 'reactstrap'

class Event extends Component {
  
  activatePanel() {
    this.props.handlePanel( 'EDIT_EVENT_PANEL', this.props.event._id );
  }

  render() {
    return (
      <Button outline color="primary" className="mr-2 btn-sm" onClick={this.activatePanel.bind(this)}>
        {/* <a href={`/events/${this.props.event._id}`}> */}
          { this.props.event.title }
        {/* </a> */}
      </Button>
    )
  }
}

export default Event;