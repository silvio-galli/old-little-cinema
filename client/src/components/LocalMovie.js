import React from 'react';
import { Button } from 'reactstrap';

function LocalMovie(props) {
  let year = props.movie.release_date && props.movie.release_date.split('-')[0];
  return (
    <div className="movie border rounded my-3 p-1" >
      <div className="row" id={props.movie._id}>
        <div className="col-md-4 text-center">
          <img src={props.movie.poster_path} alt="" />
        </div>
        <div className="col-md-8">
          <ul className="ml-0 pl-0">
            <li><b>Title:</b> { props.movie.title }</li>
            <li><b>Director:</b> { props.movie.director }</li>
            <li><b>Year:</b> { year }</li>
            <li><b>Source:</b> Local DB</li>
          </ul>
          <Button
            onClick={() => props.setPanelToDisplay('EDIT_MOVIE_PANEL', props.movie.tmdb_id)}
            outline
            color="primary"
            size="sm"
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LocalMovie;