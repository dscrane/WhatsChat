import React from 'react';
import { Field, } from "redux-form";
import RenderForm from "./RenderForm";

const SignupForm = (props) => {

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
      <Field name='name' component={renderInput} label='Name' />
      <Field name='username' component={renderInput} label='Username' />
      <Field name='email' component={renderInput} label='Email' />
      <Field name='password' component={renderInput} label='Password' />
      <Field name='passwordConf' component={renderInput} label='Confirm Password' />
      <button className='btn btn-md btn-secondary btn-block mt-4 mx-auto w-50'>Submit</button>
    </RenderForm>
  )
}

export default SignupForm;
