import React, {Component} from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';

class SearchForm extends Component {
  render() {
    return (
      <Form inline onSubmit={ this.props.onSubmit } className="mt-1">
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input
            type="text"
            name="searchMovieDb"
            onChange={ this.props.onChange }
            placeholder="Search for a title"
          />
          <Button outline>Search</Button>
        </FormGroup>
      </Form>
    )
  }
}

export default SearchForm;