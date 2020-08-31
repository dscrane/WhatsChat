import React from 'react';
import { reduxForm } from "redux-form";
import classNames from "classnames";

const RenderForm = (props) => {

  const handleForm = formValues => {
    props.handleForm(formValues);
  }


  return (

    <form onSubmit={props.handleSubmit(handleForm)} className='form-signin mt-2'>
      {props.children}
    </form>
  )

}

export default reduxForm({ form: 'homeForm' })(RenderForm);