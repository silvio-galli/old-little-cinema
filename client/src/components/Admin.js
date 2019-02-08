import React, { Component } from 'react';
import tmdbApi from '../tmdbApi';
import api from '../api';
import Movie from './Movie';
import LocalMovie from './LocalMovie';
import EventButton from './EventButton';
import SearchForm from './SearchForm';
import ApiResultPaginationList from './ApiResultPaginationList';
import PanelSwitch from './PanelSwitch';

class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchFor: 'XRQZ',
      tmdbMovies: [],
      tmdbTotalResults: null,
      tmdbTotalPages: null,
      tmdbActivePage: null,
      localMovies: [],
      filteredMovies: [],
      events: [],
      currentPanel: {
        componentName: null,
        componentId: null
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
      filteredMovies: filtered,
      tmdbActivePage: 1
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    tmdbApi.getMovies( this.state.searchFor, e.target.innerHTML ) // NOTE 1 
    .then( response => {
      this.setState({
        tmdbMovies: [...response.results],
        tmdbTotalResults: response.total_results,
        tmdbTotalPages: response.total_pages > 12 ? 12 : response.total_pages, //TODO: change this as soon as possible
        tmdbActivePage: response.page                                          
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

  activatePanel(e) {
    console.log( "NEW EVENT CALL e.target -->", e.target.value );
    this.handlePanel( e.target.value );
  }

  handlePanel( componentName, componentId ) {
    let currentPanel = {
      componentName: componentName,
      componentId: componentId
    }

    this.setState({
      currentPanel: currentPanel
    })

  }

  render() {
    
    return (
      <div className="container-fluid mb-5">

        {/* FIRST row START */}
        <div className="row">
          
          {/* PAGINATION starts here */}
          <div className="col-md-3 api-result-list text-center">
          {
            this.state.tmdbTotalResults !== 0
            ?
            <ApiResultPaginationList
              tmdbTotalPages={ this.state.tmdbTotalPages }
              tmdbActivePage={ this.state.tmdbActivePage }
              handlePageRequest={ this.handleSubmit.bind(this) }
            />
            :
            <h6>No results from themoviedb.org</h6>
          }
          </div>
          {/* PAGINATION ends here */}
          
          {/* SEARCH starts here */}
          <div className="col-md-3">
            <SearchForm onChange={this.handleChange.bind(this)} onSubmit={this.handleSubmit.bind(this)} />
          </div>
          {/* SEARCH ends here */}

          <div className="col-md-6">
            <button className="btn btn-outline-success mr-2 mt-1" onClick={this.activatePanel.bind(this)} value="NEW_EVENT_PANEL">
              New Event
            </button>
          </div>

        </div>
        {/* FIRST row END */}

        {/* SECOND row START */}
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
              this.state.filteredMovies.map( movie => <LocalMovie key={movie._id} movie={movie} handlePanel={ this.handlePanel.bind(this) } /> )
            }
          </div>
          
          {/* SIDE PANEL */}
          <div className="col-md-6 side-panel mt-2">
            
            <div className="row">
              <div className="col">

                <div className="row mb-2">
                  <div className="col-md-3 text-right">
                    <h5>Events</h5>
                  </div>
                  <div className="col-md-9 text-left">
                    { 
                      this.state.events.map( event => <EventButton key={event._id} event={event} handlePanel={ this.handlePanel.bind(this) } /> )
                    }
                  </div>
                </div>

              </div>
            </div>

            <div className="container-fluid">
              
              <div className="row">

                {
                  this.state.currentPanel.componentName
                  &&
                  <PanelSwitch
                    movies={this.state.localMovies}
                    currentPanel={this.state.currentPanel}
                  />
                }
              
              </div>
            
            </div>

          </div>
        </div>
        {/* SECOND row END */}

      </div>

    );
  }
}

export default Admin;

/* ***** NOTES ******

1) we pass the innerHTML value of the element that triggers the event as the second parameter of the function.
   This parameter in the function stands for the page number of the query that is sent to theMovieDB.
   In case the query is triggered by one of the element of the pagination the value passed is a number, the number of the page we want from theMovieDB api.
   In case the query is triggered by the search input field, the value passed is the entire HTML of the element.
   In the getMovies() declaration in TmdbApi.js file, if the value passed is not a number, it is swapped to 1. 

*/