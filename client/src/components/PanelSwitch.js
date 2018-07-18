import React, { Component } from 'react';
import EditMoviePanel from './EditMoviePanel';
import EditEventPanel from './EditEventPanel';
import NewEventPanel from './NewEventPanel';

class PanelSwitch extends Component {
  render() {
    console.log( "PANEL_SWITCH this.props.currentPanel -->", this.props.currentPanel )
    switch ( this.props.currentPanel.isActive ) {
      case this.props.currentPanel.componentName === 'EDIT_MOVIE_PANEL':
        return <EditMoviePanel movieId={ this.props.currentPanel.componentId } />;
      case this.props.currentPanel.componentName === 'EDIT_EVENT_PANEL':
        return <EditEventPanel eventId={ this.props.currentPanel.componentId } />;
      case this.props.currentPanel.componentName === 'NEW_EVENT_PANEL':
        return <NewEventPanel />;
      default:
        return ( <span></span> );
    }
  }
}

export default PanelSwitch;