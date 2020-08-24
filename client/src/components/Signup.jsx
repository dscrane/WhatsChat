import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';


class Signup extends Component {

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  }

  render() {
      return (
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form'>
          <Field name='name'/>
          <Field name='username'/>
          <Field name='email'/>
          <Field name='password'/>
          <Field name='passwordConfirm'/>
          <button className='ui button primary'>Submit</button>
        </form>
      )
    }
}

export default reduxForm({
  form: 'signup'
})(Signup);