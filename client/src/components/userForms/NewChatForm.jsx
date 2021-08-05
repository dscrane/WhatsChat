import React from 'react';
import { plusIcon } from "../../icons/icons";

export const NewChatForm = (props) => {

  const onChange = e => {
    props.onChange(e)
  }

  const handleForm = e => {
    props.handleForm(e)
  }

  const errorStyle = props.newRoomName.length < 5 && props.newRoomName.length !== 0 ? 'is-invalid' : null

  return (
    <form className='w-100' onSubmit={handleForm}>
      <div className='chatroom__form'>
        <div className='d-flex justify-content-start mx-auto'>
            <input
              onChange={onChange}
              className={`chatroom__form_input form-control ${errorStyle}`}
              type='text'
              placeholder={'Start new chat'}
              name='chatForm'
              required
            />
        </div>
        <div className='d-flex justify-content-end'>
          <button
            type='submit'
            className='chatroom__cta-new btn p-0'
          >
            <div className='chatroom__new-cta'>
              {plusIcon}
            </div>
          </button>
        </div>
      </div>
    </form>
  )
}
