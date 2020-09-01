import React, { Component } from 'react';
import { Field, } from "redux-form";
import RenderForm from "./RenderForm";

const LoginForm = (props) => {

  const renderInput = ({ input, label }) => {
    return (
      <div>
        <label className='text-white text-left my-2' >{label}</label>
        <input className='form-control' placeholder={label} {...input} />
      </div>
    )
  }

  const handleForm = formValues => {
    props.handleForm(formValues);
  }

  return(
    <RenderForm handleForm={handleForm}>
      <div className='ui stacked element'>
        <Field name='username' component={renderInput} label='Username' />
        <Field name='password' component={renderInput} label='Password' />
        <button className='btn btn-md btn-secondary btn-block my-4 mx-auto w-25'>Submit</button>
      </div>
    </RenderForm>
  )
}

export default LoginForm;