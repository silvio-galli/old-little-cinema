import React from 'react';
import { Button } from 'reactstrap'

function Event(props) {
  return (
    <Button
      outline
      color="primary"
      className="mr-2 btn-sm"
      onClick={() => props.setPanelToDisplay( 'PREVIEW_EVENT_PANEL', props.id )}
    >
      { props.title }
    </Button>
  )
}

export default Event;