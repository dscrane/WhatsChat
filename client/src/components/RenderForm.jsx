import React, { Component } from 'react';
import { reduxForm } from "redux-form";

class RenderForm extends Component {

  handleClick = formValues => {
    this.props.handleClick(formValues);
  }

  render() {
    return(
      <form onSubmit={this.props.handleSubmit(this.handleClick)} className='ui form'>
        {this.props.children}
      </form>
    )
  }
}

export default reduxForm({ form: 'signupForm' })(RenderForm);