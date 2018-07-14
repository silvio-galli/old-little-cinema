import React, { Component } from 'react';
import tmdbApi from '../tmdbApi';
import MovieDetails from './MovieDetails';
import api from '../api';
import { Button } from 'reactstrap';
import { Row, Col } from 'reactstrap';

class MoviePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movie: {}
    }
  }

  componentDidMount() {
    api.getMovie(this.props.match.params.movieId)
    .then( movie => {
      this.setState({
        movie: movie
      })
    })
    .catch(err => { throw err } );
  }

  render() {
    console.log( "MOVIE inside MoviePage --->", this.state.movie )
    const year = this.state.movie.release_date && this.state.movie.release_date.split('-')[0];
    const director = this.state.movie.director && this.state.movie.director.join(', ');
    const stars = this.state.movie.cast && this.state.movie.cast.join(', ');
    const countries = this.state.movie.production_countries && this.state.movie.production_countries.join(', ');
    return (
      <div>
        <h1>{ this.state.movie.title } <small>({ year })</small></h1>
        <Row>
          <Col md="4">
            <img src={this.state.movie.poster_path} alt="" className="img-thumbnail" />
          </Col>
          <Col md="8">
            <ul>
              <li><b>Title:</b> { this.state.movie.title }</li>
              <li><b>Director:</b> { this.state.movie.director }</li>
              <li><b>Release Date:</b> { this.state.movie.release_date}</li>
              <li><b>Director:</b> { director }</li>
              <li><b>Stars:</b> { stars }}</li>
              <li><b>Countries:</b> { countries }</li>
              <li><b>Runtime:</b> { this.state.movie.runtime } min.</li>
            </ul>
            <p>
              <b>Plot: </b>
              { this.state.movie.overview }
            </p>
          </Col>
        </Row>
      </div>
    )
  }
}

export default MoviePage;