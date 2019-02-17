import React from 'react';
import { Button } from 'reactstrap'

function Event(props) {
  return (
    <Button
      outline
      color={props.published ? "primary" : "warning"}
      className="m-1 btn-sm"
      onClick={() => props.setPanelToDisplay('PREVIEW_EVENT_PANEL', props.id )}
      active={props.active}
    >
      { props.children }
    </Button>
  )
}

export default Event;