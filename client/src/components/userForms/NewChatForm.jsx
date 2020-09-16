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
        className='d-flex flex-row justify-content-center align-items-center text-center text-white w-100 text-decoration-none'
        style={{height: '8vh', borderBottom: '1px solid white'}}
      >
        <div className='d-flex justify-content-end col-3 mx-auto'>
          <button
            type='submit'
            className='btn p-0'
            style={{background: 'none', border: 'none', borderStyle: 'none'}}
          >
            <div className='d-flex align-items-center text-secondary'  style={{fontSize: '35px'}}>
              {plusIcon}
            </div>
          </button>
        </div>
        <div className='col-9'>
          <input onChange={onChange} className={`form-control ${errorStyle}`} type='text' placeholder={'Create Chat Room....'} name='chatForm' required/>
        </div>
      </div>
    </form>
  )
}
