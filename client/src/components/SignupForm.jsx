import React, { Component } from 'react';
import { Field, } from "redux-form";
import RenderForm from "./RenderForm";

export default class SignupForm extends Component {

  renderInput = ({ input, label }) => {
    return (
      <div>
        <label>{label}</label>
        <input {...input} />
      </div>
    )
  }

  handleForm = formValues => {
    this.props.handleClick(formValues);
  }

  render() {
    return(
      <RenderForm handleForm={this.handleForm}>
        <Field name='name' component={this.renderInput} label='Name' />
        <Field name='username' component={this.renderInput} label='Username' />
        <Field name='email' component={this.renderInput} label='Email' />
        <Field name='password' component={this.renderInput} label='Password' />
        <Field name='passwordConf' component={this.renderInput} label='Confirm Password' />
        <button className='ui button'>Submit</button>
      </RenderForm>
    )
  }
}

