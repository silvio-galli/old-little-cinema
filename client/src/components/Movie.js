import React, { Component } from 'react';
import tmdbApi from '../tmdbApi';
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
    tmdbApi.getMovieDetails(this.state.movieId)
    .then(response => {
      console.log( "MOVIE DETAILS -->", response )
      this.setState({
        movieDetails: {
          tmdb_id: response.id,
          imdb_id: response.imdb_id,
          title: response.title,
          tagline: response.tagline,
          original_title: response.original_title,
          original_language: response.original_language,
          director: response.credits.crew.filter(member => member.job === 'Director').map( el => el.name),
          overview: response.overview,
          poster_path: `https://image.tmdb.org/t/p/w500${response.poster_path}`,
          cast: response.credits.cast.map(el => el.name).slice(0,10),
          genres: response.genres.map(genre => genre.name),
          production_countries: response.production_countries.map(country => country.name),
          release_date: response.release_date,
          runtime: response.runtime
        }
      })
    })
    .catch( err => { throw err } )
  }

  addMovie() {
    this.props.onAdd(this.state.movieDetails);
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

        { <Button onClick={this.addMovie.bind(this)} color="success" className="mt-2" type="submit">Add Movie</Button> }
        <h6><b>Title:</b> { this.props.movie.title }</h6>
        {
          this.state.movieDetails && <MovieDetails details={this.state.movieDetails} />
        }
      </div>
    )
  }
}

export default Movie;