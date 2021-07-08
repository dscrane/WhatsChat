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
      <div
        className='chatroom__form'
      >
        <div className='d-flex justify-content-end col-3 mx-auto'>
          <button
            type='submit'
            className='chatroom__cta-new btn p-0'
          >
            <div className='chatroom__new-cta text-secondary'>
              {plusIcon}
            </div>
          </button>
        </div>
        <div className='col-9'>
          <input onChange={onChange} className={`form-control ${errorStyle}`} type='text' placeholder={'Create Chat Room....'} name='chatForm' required />
        </div>
      </div>
    </form>
  )
}
