import React, { Component } from 'react';
import tmdbApi from '../tmdbApi';
import api from '../api';
import Movie from './Movie';
import LocalMovie from './LocalMovie';
import Event from './Event';
import SearchForm from './SearchForm';
import MoviePanel from './MoviePanel';

class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchFor: 'XRQZ',
      tmdbMovies: [],
      localMovies: [],
      filteredMovies: [],
      events: [],
      moviePanel: {
        isActive: false,
        movieId: ''
      }
    }
  }

  componentDidMount() {
    api.getMovies()
    .then(movies =>{
      this.setState({
        localMovies: [...movies]
      })
    })
    .catch( err => { throw err })

    api.getEvents()
    .then(events => {
      this.setState({
        events: [...events]
      })
    })
    .catch( err => { throw err })
  }

  handleChange(e) {
    let word = e.target.value !== '' ? e.target.value : 'XRQZ'
    this.setState({
      searchFor: word
    })
    let filtered = this.state.localMovies.filter( movie => movie.title.toUpperCase().includes(word.toUpperCase()) || movie.original_title.toUpperCase().includes(word.toUpperCase()) );
    this.setState({
      filteredMovies: filtered
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    tmdbApi.getMovies( this.state.searchFor )
    .then( response => {
      this.setState({
        tmdbMovies: [...response.results]
      })
    })
    .catch( err => { throw err })
  }

  handleAddMovie( newMovie ) {
    console.log('LUDWIG debug newMovie added:', newMovie)
    this.setState({
      localMovies: [...this.state.localMovies, newMovie],
      filteredMovies: [...this.state.filteredMovies, newMovie]
    })
    // api.getMovies()
    // .then( movies => {
    //   let filtered = movies.filter( movie => movie.title.toUpperCase().includes(this.state.searchFor.toUpperCase()) || movie.original_title.toUpperCase().includes(this.state.searchFor.toUpperCase()) );
    //   this.setState({
    //     filteredMovies: filtered
    //   })
    // })
  }

  showPanel(movieId) {
    console.log( "You're trying to toggle the side panel." );  
    this.setState({
      moviePanel: {
        isActive: !this.state.moviePanel.isActive,
        movieId: movieId
      }
    })
  }

  render() {
    
    return (
      <div className="container-fluid">
        <SearchForm onChange={this.handleChange.bind(this)} onSubmit={this.handleSubmit.bind(this)} />
        <div className="row">
          <div className="col-md-3 movieDb-list">
            {/* THEMOVIEDB.org results */}
            { 
              this.state.tmdbMovies.map( movie => <Movie key={movie.id} movie={movie} onAdd={this.handleAddMovie.bind(this)}  /> )
            }
          </div>
          <div className="col-md-3 local-db-list">
            {/* LOCAL DB results */}
            { 
              this.state.filteredMovies.map( movie => <LocalMovie key={movie._id} movie={movie} showPanel={ this.showPanel.bind(this) } /> )
            }
          </div>
          <div className="col-md-6 side-panel">
            {/* SIDE PANEL */}
            <div className="row">
              <div className="col">
                <div className="row">
                  <div className="col-md-3 text-right">
                    Main Movies
                  </div>
                  <div className="col-md-9 text-left">
                    some data here
                  </div>
                </div>
                <hr />
                <div className="row mb-2">
                  <div className="col-md-3 text-right">
                    Events
                  </div>
                  <div className="col-md-9 text-left">
                    { 
                      this.state.events.map( event => <Event key={event._id} event={event} /> )
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid">
              <div className="row">
                { this.state.moviePanel.isActive && <MoviePanel movieId={this.state.moviePanel.movieId} /> }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
