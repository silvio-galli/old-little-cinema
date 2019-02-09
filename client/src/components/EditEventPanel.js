import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import api from '../api';
// import { Row, Col } from 'reactstrap';

class EditEventPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      event: {}
    }
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

    return (
      <div className="side-panel">
        <h6>Edit Event Page</h6>
        <p>{ this.state.event._id && this.state.event._id }</p>
      </div>
    )
  }
}

export default EditEventPanel;