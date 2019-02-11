import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import tmdbApi from '../tmdbApi';
import api from '../api';
import { Button } from 'reactstrap';

class Movie extends Component {
  constructor(props){
    super(props)
    let {alreadyLocal} = this.props.movie
    this.state = {
      movieId: this.props.movie.id,
      alreadyLocal,
      movieDetails: null
    }
  }

  // to get the details of all movies
  // uncomment this below
  componentDidMount() {
    tmdbApi.getMovieDetailsFromTmdb(this.state.movieId)
    .then(response => {
      this.setState({
        movieDetails: {
          tmdb_id: response.id,
          imdb_id: response.imdb_id ? response.imdb_id : '',
          title: response.title,
          tagline: response.tagline,
          original_title: response.original_title ? response.original_title : '',
          original_language: response.original_language ? response.original_language : '',
          director: response.credits ? response.credits.crew.filter(member => member.job === 'Director').map( el => el.name): "",
          overview: response.overview ? response.overview : '',
          poster_path: response.poster_path ? `https://image.tmdb.org/t/p/w500${response.poster_path}` : 'find a default poster for missing one',
          cast: response.credits ? response.credits.cast.map(el => el.name).slice(0,10) : "",
          genres: response.genres ? response.genres.map(genre => genre.name) : "",
          production_countries: response.production_countries ? response.production_countries.map(country => country.name) : [],
          release_date: response.release_date ? response.release_date : '',
          runtime: response.runtime ? response.runtime : NaN
        }
      })
    })
    .catch( err => { throw err } )
  }

  addMovieToLocalDB() {
    api.postMovies( this.state.movieDetails )
    .then( response => {
      console.log( "Response from local DB after adding movie", response );
      if (response.success) {
        this.setState({
          alreadyLocal: true
        })
        this.props.onAdd( response.newMovie )
      }
    })
    .catch( err => { throw err } )
  }

  render() {
    return (
      <div className="movie border rounded my-3 p-1" >
        <div className="row" id={this.props.movie.id}>
          <div className="col-md-4">
            <img src={`https://image.tmdb.org/t/p/w500${this.props.movie.poster_path}`} alt="" />
          </div>
          <div className="col-md-8">
            <ul className="ml-0 pl-0">
              <li>
                <b>Title:</b> { this.props.movie.title }
              </li>
              { this.state.movieDetails && <li><b>Director:</b> { this.state.movieDetails.director }</li> }
              <li><b>Year:</b> {this.props.movie.release_date.split('-')[0]}</li>
              <li><b>Source:</b> <Link to={`https://www.themoviedb.org/movie/${this.props.movie.id}`}target="_blank">themoviedb.org</Link></li>
            </ul>
            {
              this.state.alreadyLocal
              ?
              <Button outline color="secondary" size="sm" >Already Saved</Button>
              :
              <Button onClick={this.addMovieToLocalDB.bind(this)} outline color="success" size="sm" >Add Movie</Button>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Movie;