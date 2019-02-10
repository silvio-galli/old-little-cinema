import React from 'react';
import { Button } from 'reactstrap'

function Event(props) {
  return (
    <Button
      outline
      color="primary"
      className="m-1 btn-sm"
      onClick={() => props.setPanelToDisplay('PREVIEW_EVENT_PANEL', props.id )}
      active={props.active}
    >
      { props.kind === "review" ? `${props.kind} - ${props.title}` : `${props.kind} - ${props.movieTitle}`  }
    </Button>
  )
}

export default Event;