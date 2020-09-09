import React from 'react';
import { reduxForm } from "redux-form";

const RenderForm = (props) => {

  const handleForm = formValues => {
    const {initialValues} = props;

    if (!initialValues) {
      return props.handleForm(formValues);
    }

    let updateValues = {};
    Object.keys(initialValues).forEach((value) => {
       if (initialValues[value] !== formValues[value]) {
         updateValues = { ...updateValues,  [value]: formValues[value] }
       }
    })
    props.handleForm(updateValues);
  }

  return (
    <form onSubmit={props.handleSubmit(handleForm)} className='form-signin mt-2'>
      {props.children}
    </form>
  )
}

export default reduxForm({ form: 'userForm' })(RenderForm);