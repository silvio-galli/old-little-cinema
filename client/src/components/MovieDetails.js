import React, { Component } from 'react';

class MovieDetails extends Component {

  render() {
    return (
      <div className="movie-details">
        <div className="movie-info">
          <p className="plot">{ this.props.details.overview }</p>
          <p><b>Director</b>: { this.props.details.director.join(', ') }</p>
          <p><b>Stars</b>: { this.props.details.cast.join(', ') }</p>
          <p className="run-time">
            ({ this.props.details.production_countries.join(', ') }, {this.props.details.runtime} min) | 
            <span><b>Release:</b> {this.props.details.release_date}</span>
          </p>
        </div>
      </div>
    )
  }
}

export default MovieDetails;