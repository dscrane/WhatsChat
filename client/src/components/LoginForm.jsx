import React, { Component } from 'react';
import { Field, } from "redux-form";
import RenderForm from "./RenderForm";

export default class LoginForm extends Component {

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
        <div className='ui stacked element'>
          <Field name='username' component={this.renderInput} label='Username' />
          <Field name='password' component={this.renderInput} label='Password' />
          <button className='btn btn-md btn-secondary btn-block my-4 mx-auto w-25'>Submit</button>
        </div>
      </RenderForm>
    )
  }
}