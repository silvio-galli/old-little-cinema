import React from 'react'
import Calendar from './Calendar'
function PremiereHome(props) {
  return(
    <div class="row movie-tabs">
      <div class="col-md-2 col-sm-3 ">
        <a href="">
          <img className="img-fluid" src={props.event._movie.poster_path} alt="Movie title" />
        </a>
      </div>
      <div class="col-md-10 col-sm-9">
        {
          props.event.title &&
          <h4 className="mb-2 no-underline">
            {props.event.title}
            <br />
            {props.event.title && <small>{props.event.subtitle}</small>}
          </h4>
        }
        <h3 className="no-underline">{props.event._movie.title}</h3>
        <p className="short-info">
          {props.event._movie.genres && <span class="detail">{props.event._movie.genres.join(", ")}
</span>}
          {props.event._movie.production_countries && <span className="detail"><i className="fas fa-globe"></i> {props.event._movie.production_countries.join(', ')}</span>}
          {props.event._movie.release_date && <span className="detail"><i className="fas fa-calendar-alt"></i> {props.event._movie.release_date.slice(0,4)}</span>}
          {props.event._movie.runtime && <span className="detail"><i className="fas fa-clock"></i> {props.event._movie.runtime} mins</span>}
        </p>
        <p>
          {props.event._movie.overview}
        </p>
        <p>
          <a href="" class="arrow-button">
            Read more <i class="fas fa-chevron-right"></i>
          </a>
        </p>
        <p>
          <span className="viewing-times">Viewing Times:</span>
          {
            props.event.dates.map((date, index) =>{
              return <Calendar date={date} showtimes={props.event.showtimes[index]} />
            })
          }
          {/* <span class="certificate"></span> */}
        </p>
      </div>
    </div>
  )
} 

export default PremiereHome