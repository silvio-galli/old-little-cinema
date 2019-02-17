import React from 'react';

function ReviewForm(props) {
  return (
    <div>
      <h6>Add a movie to this review</h6>
      <form className="form border rounded" onSubmit={props.handleAddMovieToEvent}>
        
        <select id="movieId" name="movieId" className="form-control" onChange={props.handleChange} value={props.movieId} required>
          <option value="" placeholder='Select a movie'>Select a movie</option>
          { 
            props.movies.sort((a,b) => {
              if(a.title < b.title) return -1;
              if(a.title > b.title) return 1;
              return 0
            }).map(movie => {
              return <option key={movie._id} value={movie._id}>{ movie.title }</option>
            })
          }
        </select>

        <div className="form-group m-1">
          <input
            type="date"
            className="form-control"
            id="movieDate"
            name="movieDate"
            value={props.movieDate}
            onChange={props.handleChange}
            required
          />
        </div>

        <div className="form-group m-1">
          <input
            type="text"
            className="form-control"
            id="movieShowtime"
            name="movieShowtime"
            value={props.movieShowtime}
            placeholder="Enter showtime for this movie"
            onChange={props.handleChange}
            required
          />
        </div>

        <div className="form-group m-1">
          <button type="submit" className="btn btn-outline-secondary">Add Movie</button>
        </div>
      </form>
    </div>
  )
}


export default ReviewForm
