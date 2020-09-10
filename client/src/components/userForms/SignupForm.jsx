import React from 'react';
import { Field, } from "redux-form";
import RenderForm from "./RenderForm";

const SignupForm = (props) => {

  const renderInput = ({ input, label, type }) => {
    return (
      <div>
        <label className='text-white text-left my-2' >{label}</label>
        <input className='form-control' type={type} placeholder={label} {...input} required />
      </div>
    )
  }

  const handleForm = formValues => {
    props.handleForm(formValues);
  }

  return(
    <RenderForm handleForm={handleForm}>
      <Field name='name' component={renderInput} label='Name' type='text' />
      <Field name='username' component={renderInput} label='Username' type='text' />
      <Field name='email' component={renderInput} label='Email' type='email' />
      <Field name='password' component={renderInput} label='Password' type='password' />
      <Field name='passwordConf' component={renderInput} label='Confirm Password' type='password' />
      <button className='btn btn-md btn-secondary btn-block mt-4 mx-auto w-50'>Submit</button>
    </RenderForm>
  )
}

export default SignupForm;
