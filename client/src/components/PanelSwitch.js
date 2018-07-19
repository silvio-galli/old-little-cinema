import React, { Component } from 'react';
import EditMoviePanel from './EditMoviePanel';
import EditEventPanel from './EditEventPanel';
import NewEventPanel from './NewEventPanel';

class PanelSwitch extends Component {

  render() {
    switch ( this.props.currentPanel.componentName ) {
      case 'EDIT_MOVIE_PANEL':
        return <EditMoviePanel movieId={ this.props.currentPanel.componentId } />;
      case 'EDIT_EVENT_PANEL':
        return <EditEventPanel eventId={ this.props.currentPanel.componentId } />;
      case 'NEW_EVENT_PANEL':
        return <NewEventPanel />;
      default:
        return ( <span></span> );
    }
  }
}

export default PanelSwitch;