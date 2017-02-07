import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import * as actions from '../../actions';
import {compose} from "redux"
import {connect} from "react-redux"

class Signin extends Component {
  handleFormSubmit({email, password}) {
    this.props.signinUser({email, password});
  }
  render() {
    const {handleSubmit, fields: {email, password}} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field name="email" component="input" type="email" className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field name="password" component="input" type="password" className="form-control" />
        </fieldset>
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

// export default reduxForm({
//   form: 'signin',
//   fields: [ 'email', 'password']
// }, null, actions)(Signin);

export default compose(
  connect(null, actions),
  reduxForm({
    form: 'signin',
    fields: ['email', 'password']
  })
)(Signin);
