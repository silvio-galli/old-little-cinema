import React from 'react';
import EditMoviePanel from './EditMoviePanel';
import EditEventPanel from './EditEventPanel';
import NewEventPanel from './NewEventPanel';
import PreviewEventPanel from './PreviewEventPanel';


function PanelSwitch(props) {

  switch ( props.currentPanel.componentName ) {
    case 'EDIT_MOVIE_PANEL':
      return <EditMoviePanel
                movieId={ props.currentPanel.componentId }
              />;
    case 'EDIT_EVENT_PANEL':
      return <EditEventPanel
                eventId={ props.currentPanel.componentId }
                movies={props.movies}
                updateEvents={props.updateEvents}
                setPanelToDisplay={props.setPanelToDisplay}
              />;
    case 'NEW_EVENT_PANEL':
      return <NewEventPanel
                movies={props.movies}
                addEvent={props.addEvent}
                setPanelToDisplay={props.setPanelToDisplay}
              />;
    case 'PREVIEW_EVENT_PANEL':
      return <PreviewEventPanel
                eventId={ props.currentPanel.componentId }
                movies={ props.movies }
                deleteEvent={props.deleteEvent}
                setPanelToDisplay={props.setPanelToDisplay}
              />;
    default:
      return ( <span></span> );
  }
}

export default PanelSwitch;