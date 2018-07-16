import React, { Component } from 'react';
import api from '../api';
import { Row, Col } from 'reactstrap';

class MoviePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      external_links: '',
      trailer: '',
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

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(`Changing this.state[${e.target.name}]`, this.state[e.target.name] );
  }

  handleAdd(e) {
    e.preventDefault();
    console.log(`Clicked clicked!!`);
    let key = e.target.getElementsByClassName("form-control")[0]["name"];
    let movie = Object.assign({}, this.state.movie);
    if (key === "external_links") {
      movie[key].push(this.state[key]);
    } else {
      movie[key] = this.state[key];
    }
    console.log( "MOVIE COPY --->", movie );
    this.setState({
      movie: movie
    })
    this.setState({
      [key]: ''
    })
  }

  saveChanges() {
    console.log("SAVE THE CHANGES");
    api.postMovieDetails(`${this.state.movie._id}`, this.state.movie)
    .then( response => {
      console.log( "RESPONSE AFTER SAVE CHANGES -->", response );
      // this.setState({
      //   movie: response
      // })
    })
    .catch( err => { throw err })
  }

  render() {
    console.log( "MOVIE inside MoviePage --->", this.state.movie )

    const year = this.state.movie.release_date && this.state.movie.release_date.split('-')[0];
    const director = this.state.movie.director && this.state.movie.director.join(', ');
    const stars = this.state.movie.cast && this.state.movie.cast.join(', ');
    const countries = this.state.movie.production_countries && this.state.movie.production_countries.join(', ');
    return (
      <div>
        <h1>{ this.state.movie.title } <small>({ year }) - [{this.state.movie._id}]</small></h1>
        <Row>
          <Col md="4">
            <img src={this.state.movie.poster_path} alt="" className="img-thumbnail" />
            {this.state.movie.trailer && <p>HERE IS THE TRAILER: {this.state.movie.trailer}</p>}
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
            <ul>
              { this.state.movie.external_links && this.state.movie.external_links.map(link => <li><a href="#">{ link }</a></li>) }
            </ul>

            <form onSubmit={this.handleAdd.bind(this)} className="form-inline">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="external_links"
                  placeholder="Enter a review link"
                  value={this.state.external_links}
                  onChange={this.handleChange.bind(this)}
                />
              </div>
              <button type="submit" className="btn">Add</button>
            </form>

            <form onSubmit={this.handleAdd.bind(this)} className="form-inline">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="trailer"
                  placeholder="Enter the trailer link"
                  value={this.state.trailer}
                  onChange={this.handleChange.bind(this)}                
                />
              </div>
              <button type="submit" className="btn">Add</button>
            </form>
            <button className="btn btn-success" onClick={this.saveChanges.bind(this)}>Save Changes</button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default MoviePage;