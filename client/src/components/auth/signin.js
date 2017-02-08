import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import * as actions from '../../actions';
import {compose} from "redux"
import {connect} from "react-redux"

class Signin extends Component {
  handleFormSubmit({email, password}) {
    this.props.signinUser({email, password});
  }
  renderAlert() {
    if(this.props.errorMessage){
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
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
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

// export default reduxForm({
//   form: 'signin',
//   fields: [ 'email', 'password']
// }, null, actions)(Signin);
function mapStateToProps(state) {
  return {errorMessage: state.auth.error};
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({
    form: 'signin',
    fields: ['email', 'password']
  })
)(Signin);
