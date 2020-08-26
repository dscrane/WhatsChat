import React, { Component } from 'react';
import { reduxForm } from "redux-form";

class RenderForm extends Component {

  handleForm = formValues => {
    this.props.handleForm(formValues);
  }

  render() {
    return(
      <form onSubmit={this.props.handleSubmit(this.handleForm)} className='ui large form'>
        {this.props.children}
      </form>
    )
  }
}

export default reduxForm({ form: 'homeForm' })(RenderForm);