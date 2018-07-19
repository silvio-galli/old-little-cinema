import React, { Component } from 'react';
import EditMoviePanel from './EditMoviePanel';
import EditEventPanel from './EditEventPanel';
import NewEventPanel from './NewEventPanel';
import PreviewEventPanel from './PreviewEventPanel';


class PanelSwitch extends Component {

  render() {
    switch ( this.props.currentPanel.componentName ) {
      case 'EDIT_MOVIE_PANEL':
        return <EditMoviePanel movieId={ this.props.currentPanel.componentId } />;
      case 'EDIT_EVENT_PANEL':
        return <EditEventPanel eventId={ this.props.currentPanel.componentId } />;
      case 'NEW_EVENT_PANEL':
        return <NewEventPanel movies={ this.props.movies } />;
      case 'PREVIEW_EVENT_PANEL':
        return <PreviewEventPanel eventId={ this.props.currentPanel.componentId } movies={ this.props.movies } />;
      default:
        return ( <span></span> );
    }
  }
}

export default PanelSwitch;