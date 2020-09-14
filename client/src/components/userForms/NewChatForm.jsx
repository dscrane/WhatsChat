import React from 'react';
import { reduxForm, Field } from "redux-form";
import {plusIcon} from "../../icons/icons";

const NewChatForm = (props) => {
  const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined

  return (
    <form className='w-100' onSubmit={props.handleSubmit(props.handleForm)}>
      <div
        className='d-flex flex-row justify-content-center align-items-center text-center text-white w-100 text-decoration-none'
        style={{height: '8vh', borderBottom: '1px solid white'}}
      >
        <div className='d-flex justify-content-end col-3 mx-auto'>
          <button
            className='btn p-0'
            style={{background: 'none', border: 'none', borderStyle: 'none'}}
          >
            <div className='d-flex align-items-center text-secondary'  style={{fontSize: '35px'}}>
              {plusIcon}
            </div>
          </button>
        </div>
        <div className='col-9'>
          <Field
            className='form-control'
            onChange={props.onChange}
            value={props.newRoomName}
            placeholder={'Create Chat Room....'}
            validate={minLength(5)}
          />
        </div>
      </div>
    </form>



  )
}

export default reduxForm({ form: 'newChatForm' })(NewChatForm)