import React, { Component } from 'react';

class OneMovieForm extends Component {

  render() {
    return (
      <div>
        <h6>Movie for this {this.props.eventKind} show</h6>
        <form className="form border rounded" onSubmit={this.props.handleAddMovieToEvent}>
          
          <select id="movieId" name="movieId" className="form-control" onChange={this.props.handleChange} value={this.props.movieId} required>
            <option value="" placeholder='Select a movie'>Select a movie</option>
            { 
              this.props.movies.sort((a,b) => {
                if(a.title < b.title) return -1;
                if(a.title > b.title) return 1;
                return 0
              }).map(movie => {
                if (this.props._movie && this.props._movie._id === movie._id) {
                  return (
                    <option key={movie._id} value={movie._id} selected>
                      { movie.title }
                    </option>
                  )
                } else {
                  return (
                    <option key={movie._id} value={movie._id}>
                      { movie.title }
                    </option>
                  )
                }
              })
            }
          </select>

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
            <button type="submit" className="btn btn-outline-secondary">Add Show</button>
          </div>
        </form>
      </div>
    )
  }
}

export default OneMovieForm
