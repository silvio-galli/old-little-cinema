import React, { Component } from 'react';
import movieDbApi from '../movieDbApi';
import MovieDetails from './MovieDetails';
import api from '../api';
import { Button } from 'reactstrap';

class Movie extends Component {
  constructor(props){
    super(props)
    this.state = {
      movieId: this.props.movie.id,
      movieDetails: null
    }
  }

  // to get the details of all movies
  // uncomment this below
  componentDidMount() {
    movieDbApi.getMovieDetails(this.state.movieId)
    .then(response => {
      console.log( "MOVIE DETAILS -->", response )
      this.setState({
        movieDetails: {
          movieDbId: response.id,
          title: response.title,
          originalTitle: response.original_title,
          director: response.credits.crew.filter(member => member.job === 'Director').map( el => el.name),
          plot: response.overview,
          poster: `https://image.tmdb.org/t/p/w500${response.poster_path}`,
          cast: response.credits.cast.map(el => el.name).slice(0,10),
          genres: response.genres.map(genre => genre.name),
          productionCountries: response.production_countries.map(country => country.name),
          releaseDate: response.release_date,
          length: response.runtime
        }
      })
    })
    .catch( err => { throw err } )
  }

  addMovie() {
    api.postMovies( this.state.movieDetails )
    .then( newLocalMovie => {
      console.log( "New Movie added to local database", newLocalMovie );
    })
    .catch( err => { throw err })
  }

  render() {
    return (
      <div className="movie border rounded my-3 p-2" id={this.props.movie.id}>
        <img src={`https://image.tmdb.org/t/p/w500${this.props.movie.poster_path}`} alt="" />
        <br />

        { this.props.tmdb && <Button onClick={this.addMovie.bind(this)} color="success" className="mt-2" type="submit">Add Movie</Button> }
        <h6><b>Title:</b> { this.props.movie.title }</h6>
        {
          this.state.movieDetails  && <MovieDetails details={this.state.movieDetails} />
        }
      </div>
    )
  }
}

export default Movie;