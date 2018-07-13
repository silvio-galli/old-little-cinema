import React, { Component } from 'react';
import api from '../api';
import { Button } from 'reactstrap';

class LocalMovie extends Component {
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     movieId: this.props.movie.id,
  //     movieDetails: null
  //   }
  // }

  // to get the details of all movies
  // uncomment this below
  // componentDidMount() {
  //   movieDbApi.getMovieDetails(this.state.movieId)
  //   .then(response => {
  //     console.log( "MOVIE DETAILS -->", response )
  //     this.setState({
  //       movieDetails: {
  //         movieDbId: response.id,
  //         title: response.title,
  //         originalTitle: response.original_title,
  //         director: response.credits.crew.filter(member => member.job === 'Director').map( el => el.name),
  //         plot: response.overview,
  //         poster: `https://image.tmdb.org/t/p/w500${response.poster_path}`,
  //         cast: response.credits.cast.map(el => el.name).slice(0,10),
  //         genres: response.genres.map(genre => genre.name),
  //         productionCountries: response.production_countries.map(country => country.name),
  //         releaseDate: response.release_date,
  //         length: response.runtime
  //       }
  //     })
  //   })
  //   .catch( err => { throw err } )
  // }

  // addMovie() {
  //   api.postMovies( this.state.movieDetails )
  //   .then( newLocalMovie => {
  //     console.log( "New Movie added to local database", newLocalMovie );
  //   })
  //   .catch( err => { throw err })
  // }

  render() {
    return (
      <div className="movie border rounded my-3 p-2" id={this.props.movie.id}>
        <img src={this.props.movie.poster} alt="" />
        <br />
        <h6><b>Title:</b> { this.props.movie.title }</h6>
        <div className="movie-details">
          <div className="movie-info">
            <p className="plot">{ this.props.movie.overview }</p>
            <p><b>Director</b>: { this.props.movie.director.join(', ') }</p>
            <p><b>Stars</b>: { this.props.movie.cast.join(', ') }</p>
            <p className="run-time">
              ({ this.props.movie.productionCountries.join(', ') }, {this.props.movie.length} min) | 
              <span><b>Release:</b> {this.props.movie.releaseDate}</span>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default LocalMovie;