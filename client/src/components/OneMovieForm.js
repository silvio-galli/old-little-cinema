import React, { Component } from 'react';

class OneMovieForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>

        <select id="movieId" name="movieId" className="form-control" onChange={this.props.handleChange} value={this.props.movieId} required>
          <option value='Select a movie'>Select a movie</option>
          { 
            this.props.movies.sort((a,b) => {
              if(a.title < b.title) return -1;
              if(a.title > b.title) return 1;
              return 0
            }).map(movie => {
              return <option key={movie._id} value={movie._id}>{ movie.title }</option>
            })
          }
        </select>

        <form className="form border rounded" onSubmit={this.props.handleAddMovieToEvent}>
          <h6>One movie</h6>
          <div className="form-group m-1">
            <input
              type="date"
              className="form-control"
              id="movieDate"
              name="movieDate"
              value={this.props.movieDate}
              onChange={this.props.handleChange}
              required
            />
          </div>

          <div className="form-group m-1">
            <input
              type="text"
              className="form-control"
              id="movieShowtime"
              name="movieShowtime"
              value={this.props.movieShowtime}
              placeholder="Enter showtime for this movie"
              onChange={this.props.handleChange}
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
}

export default OneMovieForm
