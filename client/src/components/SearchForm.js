import React, {Component} from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';

class SearchForm extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <Form inline onSubmit={ this.props.onSubmit }>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input
                type="text"
                name="searchMovieDb"
                onChange={ this.props.onChange }
                placeholder="Search for a title"
              />
            </FormGroup>
            <Button>Search</Button>
          </Form>
        </div>  
      </div>
    )
  }
}

export default SearchForm;