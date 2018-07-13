import React, { Component } from 'react';
import movieDbApi from '../movieDbApi';
import api from '../api';
import Movie from './Movie';
import LocalMovie from './LocalMovie';
import SearchForm from './SearchForm';

class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchFor: '',
      movieDbMovies: [],
      localMovies: []
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

  handleChange(e) {
    this.setState({
      searchFor: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    movieDbApi.getMovies( this.state.searchFor )
    .then( response => {
      this.setState({
        movieDbMovies: [...response.results]
      })
    })
    .catch( err => { throw err })
  }

  render() {
    console.log("SEARCH FOR -->", this.state.searchFor)               
    return (
      <div className="page-wrapper">
        <h2>Admin</h2>
        <SearchForm onChange={this.handleChange.bind(this)} onSubmit={this.handleSubmit.bind(this)} />
        <div class="row">
          <div className="col-md-4 movieDb-list">
            <h2>tmdb.org</h2>
            {/* call the movie component for every object in the list */}
            { 
              this.state.movieDbMovies.map( movie => <Movie key={movie.id} movie={movie}  /> )
            }
          </div>
          <div className="col-md-4 local-db-list">
            <h2>Local db</h2>
            { 
              this.state.localMovies.map( movie => <LocalMovie key={movie.id} movie={movie} /> )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
