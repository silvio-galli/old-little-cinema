import React, { Component } from 'react';

class PageLink extends Component {

  render() {
    return (
      <li className={`page-item ${this.props.active}`}>
        <a className="page-link" onClick={ this.props.handlePageRequest } value={this.props.children}>
          {this.props.text}
        </a>
      </li>
    )
  }
}

export default PageLink;