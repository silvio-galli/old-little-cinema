import React, { Component } from 'react';
import { Button } from 'reactstrap';

class LocalMovie extends Component {

  handlePanel() {
    this.props.showPanel(this.props.movie.tmdb_id);
  }

  render() {
    // console.log("LOCAL MOVIE COMPONENT -->", this.props.movie)
    let year = this.props.movie.release_date && this.props.movie.release_date.split('-')[0];
    return (
      <div className="container movie border rounded my-3 p-1" >
        <div className="row" id={this.props.movie._id}>
          <div className="col-md-4 text-center">
            <img src={this.props.movie.poster_path} alt="" />
          </div>
          <div className="col-md-8">
            <ul className="ml-0 pl-0">
              <li><b>Title:</b> { this.props.movie.title }</li>
              <li><b>Director:</b> { this.props.movie.director }</li>
              <li><b>Year:</b> { year }</li>
              <li><b>Source:</b> Local DB</li>
            </ul>
            <Button onClick={this.handlePanel.bind(this)} outline color="primary" size="sm">Edit</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default LocalMovie;