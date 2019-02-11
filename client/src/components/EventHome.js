import React from 'react'
import MovieBox from './MovieBox'

function EventHome(props) {
  let {event} = props
  let eventPosterPath, eventPosterAlt, eventDetails;

  if (event.kind === 'review') {
    eventPosterPath = event.poster
    eventPosterAlt = event.title;
    eventDetails = event._movies.map((movie, index) => {
      let {_id, title, poster_path, genres, production_countries, release_date, runtime } = movie
      let movieItem = {_id, title, poster_path, genres, production_countries, release_date, runtime, date: event.dates[index], showtimes: event.showtimes[index] }
      return <MovieBox key={"review-" + movieItem._id + index} movieItem={movieItem} />
    })
  }
  else {
    eventPosterPath = event._movie.poster_path
    eventPosterAlt = event._movie.title

    let { _movie } = event
    _movie.dates = event.dates
    _movie.showtimes = event.showtimes
    eventDetails = <MovieBox key={_movie._id} movie={ _movie } />
  }
  
  return(
    <div className="row event-tabs">
      <div className="col-md-2 col-sm-3">
        <img
          className="img-fluid eventPoster"
          src={eventPosterPath}
          alt={`${eventPosterAlt} poster.`}
        />
      </div>
      <div className="col-md-10 col-sm-9">
        {
          event.title &&
          <h4 className="mb-2 no-underline">
            {event.title}
            <br />
            {event.title && <small>{event.subtitle}</small>}
          </h4>
        }
        <div className={`${event.kind === 'review' ? "row justify-content-center reviewList": "movieData"}`}>
          {eventDetails}
        </div>
        {/* <h3 className="no-underline">{event._movie.title}</h3>
        <p className="short-info">
          {event._movie.genres && <span className="detail">{event._movie.genres.join(", ")}
</span>}
          {event._movie.production_countries && <span className="detail"><i className="fas fa-globe"></i> {event._movie.production_countries.join(', ')}</span>}
          {event._movie.release_date && <span className="detail"><i className="fas fa-calendar-alt"></i> {event._movie.release_date.slice(0,4)}</span>}
          {event._movie.runtime && <span className="detail"><i className="fas fa-clock"></i> {event._movie.runtime} mins</span>}
        </p>
        <p>
          {event._movie.overview}
        </p>
        <p>
          <a href="" className="arrow-button">
            Read more <i className="fas fa-chevron-right"></i>
          </a>
        </p>
        <div>
          <span className="viewing-times">Viewing Times:</span>
          {
            event.dates.map((date, index) =>{
              return <Calendar key={`${event._id}-${index}`} date={date} showtimes={event.showtimes[index]} />
            })
          }
          <span class="certificate"></span> */}
        
      </div>
    </div>
  )
} 

export default EventHome