import React, { Component } from 'react';
import tmdbApi from '../tmdbApi';
import api from '../api';
import Movie from './Movie';
import LocalMovie from './LocalMovie';
import SearchForm from './SearchForm';

class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchFor: 'XRQZ',
      tmdbMovies: [],
      localMovies: [],
      filteredMovies: []
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
  }

  comp

  handleChange(e) {
    let word = e.target.value !== '' ? e.target.value : 'XRQZ'
    this.setState({
      searchFor: word
    })
    let filtered = this.state.localMovies.filter( movie => movie.title.toUpperCase().includes(word.toUpperCase()) );
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
    this.setState({
      localMovies: [...this.state.localMovies, newMovie],
      filteredMovies: [...this.state.filteredMovies, newMovie]
    })
  }

  render() {
    console.log("SEARCH FOR -->", this.state.searchFor);
    
    return (
      <div className="page-wrapper">
        <h2>Admin</h2>
        <SearchForm onChange={this.handleChange.bind(this)} onSubmit={this.handleSubmit.bind(this)} />
        <div className="row">
          <div className="col-md-4 movieDb-list">
            <h2>tmdb.org</h2>
            {/* call the movie component for every object in the list */}
            { 
              this.state.tmdbMovies.map( movie => <Movie key={movie.id} movie={movie} onAdd={this.handleAddMovie.bind(this)}  /> )
            }
          </div>
          <div className="col-md-4 local-db-list">
            <h2>Local db</h2>
            { 
              this.state.filteredMovies.map( movie => <LocalMovie key={movie.id} movie={movie} /> )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
