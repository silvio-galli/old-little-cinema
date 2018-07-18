import React, { Component } from 'react';
import PageLink from './PageLink';

class ApiResultList extends Component {

  render() {
    
    const links = (function createLinks(n) {
        let arr = [];
        for (let i = 1; i <= n; i++) {
          arr.push(i)
        }
        return arr;
    })(this.props.tmdbTotalPages)

    return this.props.tmdbTotalPages > 1 && (
        <ul className="pagination pagination-sm mt-1">
          { 
            links.map( link => {
              return <PageLink
                        key={link}
                        text={`${link}`}
                        active={ link === this.props.tmdbActivePage ? "active" : '' }
                        handlePageRequest={ this.props.handlePageRequest }
                      />
            })
          }
        </ul>
    )
  }
}

export default ApiResultList;