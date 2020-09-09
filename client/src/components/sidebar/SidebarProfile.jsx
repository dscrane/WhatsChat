import React, { useState, useEffect } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { RenderForm } from '../userForms';
import ConfirmationModal from '../ConfirmationModal';
import { logout, updateUser, deleteUser } from "../../redux/actions/auth";

import { pencilIcon } from "../../icons/icons";


const SidebarProfile = ({ auth, logout, updateUser, deleteUser }) => {
 const [ modalDisplay, setModalDisplay ] = useState(false);
  const modalConfig = {
    title: 'Delete Account',
    message: 'Are you sure you want to delete your account?',
    btnText: 'Delete',
    btnStyle: 'danger'
  }

  const uploadAvatar = () => {

  }

  const handleDelete = () => {
    console.log('handleDelete')
    deleteUser();
  }

  const handleForm = (formValues) => {
    updateUser(formValues)
  }

  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className='ui error message'>
          <div className='header'>{error}</div>
        </div>
      )
    }
  }

  const renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <li className='list-group-item'>
        <div className={`row justify-content-between align-items-center ${className}`}>
          <div className='col-3 text-left p-0'>
            <label className='m-auto font-weight-bold'>
              {label}
            </label>
          </div>
          <div className='col-9'>
            <input className='form-control-plaintext text-center' {...input} readOnly={!meta.touched}  />
          </div>
          {renderError(meta)}
        </div>
      </li>
    )
  }

  const profileCard = () => {
    return (
      <>
        <div className='card'>
          <div className='card-img-top mx-auto'>
            <img
              onClick={() => uploadAvatar()}
              className=' mx-auto mt-3'
              src='http://ssl.gstatic.com/accounts/ui/avatar_2x.png'
              height='150'
              width='150'
              alt='avatar'
            />
          </div>
          <div className='card-body'>
            <RenderForm handleForm={handleForm} initialValues={_.pick(auth.data, 'name', 'username', 'email', 'password')}>
              <ul className='list-group list-group-flush'>
                <Field name='name' component={renderInput} label='Name' />
                <Field name='username' component={renderInput} label='Username' />
                <Field name='email' component={renderInput} label='Email' />
                <Field name='password' component={renderInput} label='Password' />
                <li className='list-group-item'>
                  <div className='row'>
                    <div className='col text-left'>
                      User Since:
                    </div>
                    <div className='col text-left'>
                      {moment(auth.data.createdAt).format("MMM 'YY")}
                    </div>
                  </div>
                </li>
              </ul>
              <input type="submit"
                     style={{position: 'absolute', left: '-9999px', width: '1px', height: '1px'}}
                     tabIndex="-1"/>
            </RenderForm>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item'>
                <button onClick={() => logout() } className='btn btn-secondary mt-2'>
                  Log Out
                </button>
              </li>
              <li className='list-group-item '>
                <button onClick={() => setModalDisplay(true)} className='btn btn-danger'>Delete Account</button>
              </li>
            </ul>
          </div>
        </div>
      </>
    )
  }


  const profileDisplay = auth.isLoggedIn ? profileCard() : <div className='text-white'>Log in to see your profile</div>
  console.log(modalDisplay)
  return (
    <div className='d-flex flex-column m-3' style={{width: '90%'}}>
      {profileDisplay}
      <ConfirmationModal modalConfig={modalConfig} setModalDisplay={setModalDisplay} modalDisplay={modalDisplay} handleDelete={handleDelete} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}


export default connect(mapStateToProps, { logout, updateUser, deleteUser })(SidebarProfile);