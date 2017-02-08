import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import * as actions from '../../actions';
import {compose} from "redux"
import {connect} from "react-redux"


class Signup extends Component {

  handleFormSubmit(formProps){
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if(this.props.errorMessage){
      return(
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const {handleSubmit, fields: {email, password, passwordConfirm}} = this.props;
    const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
      <input {...input} type={type}  className="form-control"/>
      {touched && error && <div className="error">{error}</div>}
  </div>
)
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
      <fieldset className="form-group">
        <Field name="email" component={renderField} type="email" label="Email:" />
      </fieldset>
      <fieldset className="form-group">
        <Field name="password" component={renderField} type="password" label="Password:" />
      </fieldset>
      <fieldset className="form-group">
        <Field name="passwordConfirm" component={renderField} type="password" label="Confirm Password:" />
      </fieldset>
      {this.renderAlert()}
      <button action="submit" className="btn btn-primary">Sign Up</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if(!formProps.email){
    errors.email = 'Please enter an email';
  }

  if(!formProps.password){
    errors.password = 'Please enter a password';
  }

  if(!formProps.passwordConfirm){
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if(formProps.password != formProps.passwordConfirm) {
    errors.passwordConfirm  = 'Passwords must match';
  }
  return errors;
}

function mapStateToProps(state){
  return {errorMessage: state.auth.error};
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
  })
)(Signup);
