import React from 'react';
import { Button } from 'reactstrap';

function LocalMovie(props) {
  let {movie} = props
  let year = movie.release_date && movie.release_date.split('-')[0];
  return (
    <div className={"movie border rounded my-3 p-1 " + (movie.pinned ? ' pinned' : '')} >
      <div className="row" id={movie._id}>
        <div className="col-md-4 text-center">
          <img src={movie.poster_path} alt="" />
        </div>
        <div className="col-md-8">
          <ul className="ml-0 pl-0">
            <li><b>Title:</b> { movie.title }</li>
            { !movie.pinned && <li><b>Director:</b> { movie.director }</li> }
            { !movie.pinned && <li><b>Year:</b> { year }</li> }
            { !movie.pinned && <li><b>Source:</b> Local DB</li> }
          </ul>
          <Button
            onClick={() => props.setPanelToDisplay('EDIT_MOVIE_PANEL', movie.tmdb_id)}
            outline
            color="primary"
            size="sm"
          >
            Edit
          </Button>
          <Button
            outline
            color="secondary"
            size="sm"
            className={'useThis' + (movie.pinned ? ' pinned' : '')}
            onClick={() => props.pinMovie(movie._id)}
          >
            {movie.pinned ? "Unpin" : "Pin"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LocalMovie;