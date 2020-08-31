import React, { Component } from 'react';
import { Field, } from "redux-form";
import RenderForm from "./RenderForm";

export default class SignupForm extends Component {

  renderInput = ({ input, label }) => {
    return (
      <div>
        <label className='text-white text-left my-2' >{label}</label>
        <input className='form-control' placeholder={label} {...input} />
      </div>
    )
  }

  handleForm = formValues => {
    this.props.handleForm(formValues);
  }

  render() {
    return(
      <RenderForm handleForm={this.handleForm}>
        <Field name='name' component={this.renderInput} label='Name' />
        <Field name='username' component={this.renderInput} label='Username' />
        <Field name='email' component={this.renderInput} label='Email' />
        <Field name='password' component={this.renderInput} label='Password' />
        <Field name='passwordConf' component={this.renderInput} label='Confirm Password' />
        <button className='btn btn-md btn-secondary btn-block mt-4 mx-auto w-50'>Submit</button>
      </RenderForm>
    )
  }
}

