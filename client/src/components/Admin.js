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
    
    this._setPanelToDisplay = this._setPanelToDisplay.bind(this)
    this._addEvent = this._addEvent.bind(this)
    this._updateEvents = this._updateEvents.bind(this)
    this._deleteEvent = this._deleteEvent.bind(this)
  }

  componentDidMount() {
    if (!api.isLoggedIn()) {
      console.log("YOU MUST BE LOGGED IN")
      this.props.history.push("/login")
    } else {
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
          events: [...events.reverse()]
        })
      })
      .catch( err => { throw err })
    }
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
    console.log('Adding new movie to localMovies and filteredMovies state...')
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
            <button
              className="btn btn-outline-success mr-2 mt-1"
              onClick={() => this._setPanelToDisplay("NEW_EVENT_PANEL")}
            >
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
              this.state.filteredMovies.map( movie => <LocalMovie key={movie._id} movie={movie} setPanelToDisplay={ this._setPanelToDisplay } /> )
            }
          </div>
          
          {/* SIDE PANEL */}
          <div className="col-md-6 side-panel mt-2">
            
            <div className="row">
              <div className="col">

                <div className="row mb-2">
                  <div className="col-md-3 text-right">
                    {/* <h5>Events</h5> */}
                  </div>
                  <div className="col-md-9 text-left">
                    { 
                      this.state.events.map( event => {
                        return (
                          <EventButton
                            key={event._id}
                            id={event._id}
                            kind={event.kind}
                            movieTitle= {event._movie ? event._movie.title : null}
                            title={event.title}
                            setPanelToDisplay={ this._setPanelToDisplay }
                            active={event.active}
                          />
                        )
                      })
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
                    movies={this.state.localMovies} // TODO: change to pinned movies to have a short list of movies to select
                    currentPanel={this.state.currentPanel}
                    setPanelToDisplay={this._setPanelToDisplay}
                    addEvent={this._addEvent}
                    updateEvents={this._updateEvents}
                    deleteEvent={this._deleteEvent}
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

  //
  _setPanelToDisplay( componentName, componentId = null ) {
    let currentPanel = {
      componentName: componentName,
      componentId: componentId
    }
    if (componentId) {
      console.log("Setting active event!!!!!!!!!")
      let events = this.state.events.slice()
      events.map(event => {
        event.active = event._id === componentId ? true : false
        return event
      })
    }
    this.setState({
      currentPanel: currentPanel
    })
  }

  //
  _addEvent( newEvent ) {
    this.setState({
      events: [newEvent, ...this.state.events]
    })
  }

  //
  _updateEvents( updated ) {
    let eventIndex = this.state.events.findIndex(event => event._id === updated._id)
    this.setState({
      events: [...this.state.events.slice(0, eventIndex), updated, ...this.state.events.slice(eventIndex+1)]
    })
  }

  //
  _deleteEvent( eventId ) {
    console.log("EVENT TO DELETE ->", eventId)
    if (api.isLoggedIn()) {
      api.deleteEvent(eventId)
      .then(response => {
        if (response.success) {
          let eventIndex = this.state.events.findIndex(event => event._id === eventId)
          this.setState({
            events: [ ...this.state.events.slice(0,eventIndex), ...this.state.events.slice(eventIndex + 1) ],
            currentPanel: {
              componentName: null,
              componentId: null
            }
          })
        }
      })
    } else {
      this.history.push('/login')
    }
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