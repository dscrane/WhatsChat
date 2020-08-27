import React from 'react';
import { reduxForm } from "redux-form";

const RenderForm = (props) => {

  const handleForm = formValues => {
    props.handleForm(formValues);
  }

  {
    return (
      <form onSubmit={props.handleSubmit(handleForm)} className='ui large form'>
        {props.children}
      </form>
    )
  }
}

export default reduxForm({ form: 'homeForm' })(RenderForm);