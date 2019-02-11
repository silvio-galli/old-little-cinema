import React from 'react'
import Calendar from './Calendar'

function MovieBox(props) {
  let { movieItem } = props
  let { movie } = props
  return(
    
    <div className={`${movieItem ? "m-1 p-1 reviewListItem" : ""}`}>
      { movieItem && (
        <div>
          <img className="moviePoster" src={movieItem.poster_path} alt=""/>
          <h5 className="no-underline">{movieItem && movieItem.title}</h5>
          <div className="clearfix"></div>
          <p className="short-info">
            {movieItem && movieItem.release_date && <span className="detail"><i className="fas fa-calendar-alt"></i> {movieItem.release_date.slice(0,4)}</span>}
            {movieItem && movieItem.runtime && <span className="detail"> <i className="fas fa-clock"></i> {movieItem.runtime} mins</span>}
          </p>
          <p className="clearfix">
            <a href="" className="arrow-button">
              Read more <i className="fas fa-chevron-right"></i>
            </a>
          </p>
          <div>
            {
              <Calendar
                date={movieItem.date}
                showtimes={movieItem.showtimes}
              />
            }
          </div>
        </div>
        )
      }

      {
        movie && (
          <div>
            <h3 className="no-underline">{movie.title}</h3>
            <p className="short-info">
              {movie.genres && <span className="detail">{movie.genres.join(", ")}
        </span>}
              {movie.production_countries && <span className="detail"><i className="fas fa-globe"></i> {movie.production_countries.join(', ')}</span>}
              {movie.release_date && <span className="detail"><i className="fas fa-calendar-alt"></i> {movie.release_date.slice(0,4)}</span>}
              {movie.runtime && <span className="detail"><i className="fas fa-clock"></i> {movie.runtime} mins</span>}
            </p>
            <p className="overview">
              {movie.overview}
            </p>
            <p>
              <a href="" className="arrow-button">
                Read more <i className="fas fa-chevron-right"></i>
              </a>
            </p>
            <div>
              <span className="viewing-times">Viewing Times:</span>
              {
                movie.dates.map((date, index) =>{
                  return <Calendar key={`${movie._id}-${index}`} date={date} showtimes={movie.showtimes[index]} />
                })
              }
              {/* <span class="certificate"></span> */}
            </div>
          </div>
        )
      }
    </div>
  )
}

export default MovieBox