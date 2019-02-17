import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { Row, Col } from 'reactstrap';

class MoviePanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      external_links: '',
      trailer: '',
      movie: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    api.getMovie(nextProps.movieId)
    .then( movie => {
      this.setState({
        movie: movie
      })
    })
    .catch(err => { throw err } );
  }

  componentDidMount() {
    api.getMovie(this.props.movieId)
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
    console.log("SAVING CHANGES TO DB");
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
    //const year = this.state.movie.release_date && this.state.movie.release_date.split('-')[0];
    const director = this.state.movie.director && this.state.movie.director.join(', ');
    const stars = this.state.movie.cast && this.state.movie.cast.join(', ');
    const countries = this.state.movie.production_countries && this.state.movie.production_countries.join(', ');
    
    function getDomain(address) {
      var res = address.match(/\b(?:(?:https?|ftp):\/\/(www.)?)?([^\/\n]+)\/?/);
      return res[2];
    }

    return (
      <div className="movie-panel">
        <Row>
          <Col md="4">
            <img src={this.state.movie.poster_path} alt="" className="img-thumbnail" />
              { this.state.movie.trailer && <p>Here the movie player embedded:<br />{ this.state.movie.trailer }</p>  }
          </Col>
          <Col md="8" className="text-left">
            <ul className="list-group">
              <li className="list-group-item p-1"><b>Title:</b> { this.state.movie.title }</li>
              <li className="list-group-item p-1"><b>Original Title:</b> { this.state.movie.original_title }</li>
              <li className="list-group-item p-1"><b>Director:</b> { this.state.movie.director }</li>
              <li className="list-group-item p-1"><b>Release Date:</b> { this.state.movie.release_date}</li>
              <li className="list-group-item p-1"><b>Director:</b> { director }</li>
              <li className="list-group-item p-1"><b>Stars:</b> { stars }}</li>
              <li className="list-group-item p-1"><b>Countries:</b> { countries }</li>
              <li className="list-group-item p-1"><b>Runtime:</b> { this.state.movie.runtime } min.</li>
            </ul>
            <p className="text-left">
              <b>Plot: </b>
              { this.state.movie.overview }
            </p>

            { 
              this.state.movie.external_links &&
              <div className="external-links text-left mb-2">
                <h6>Reviews and articles:</h6>
                { this.state.movie.external_links.map(link => {
                    return (
                      <Link key={link} to={ link } className="btn btn-sm btn-outline-info m-1 btn-outline" target="_blank">
                        { getDomain( link ) }
                      </Link>
                    )
                  })
                }
              </div>
            }
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
              <button type="submit" className="btn btn-outline-secondary">Add</button>
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
              <button type="submit" className="btn btn-outline-secondary">Add</button>
            </form>
            <button className="btn btn-success mt-2" onClick={this.saveChanges.bind(this)}>Save Changes</button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default MoviePanel;