import React, { Component } from 'react';
import { Field, } from "redux-form";
import RenderForm from "./RenderForm";

export default class LoginForm extends Component {

  renderInput = ({ input, label }) => {
    return (
      <div>
        <label>{label}</label>
        <input {...input} />
      </div>
    )
  }

  handleForm = formValues => {
    this.props.handleForm(formValues);
  }

  render() {
    return(
      <RenderForm handleForm={this.handleForm}>
        <div className='ui stacked element'>
          <Field name='username' component={this.renderInput} label='Username' />
          <Field name='password' component={this.renderInput} label='Password' />
          <button className='ui button'>Submit</button>
        </div>
      </RenderForm>
    )
  }
}