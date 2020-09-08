import React, { useState, useEffect } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { RenderForm } from '../userForms';
import { logout, updateUser } from "../../redux/actions/auth";


const SidebarProfile = ({ auth, logout, updateUser }) => {
  const [ isEditing, setIsEditing ] = useState(false);


  const uploadAvatar = () => {

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

  const renderInput = ({ input, label, meta, name }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <li className='list-group-item'>
        <div className={`row justify-content-between align-items-center ${className}`}>
          <div className='col-3 text-left p-0'>
            <label className='m-auto'>
              {label}
            </label>
          </div>
          <div className='col-9 text-right'>
            <input className='form-control' {...input} readOnly={!meta.touched} />
          </div>
          {renderError(meta)}
        </div>
      </li>
    )
  }

  const cardCTA = () => {
    if (isEditing) {
      return (
        <button  className='btn btn-secondary mt-2'>
          Save Changes
        </button>
      )
    }
    return (
      <button onClick={() => logout() } className='btn btn-secondary mt-2'>
        Log Out
      </button>
    )
  }

  const profileCard = () => {
    const user = auth.data;
    return (
      <div className='card'>
        <img
          onClick={() => uploadAvatar()}
          className='card-img-top w-50 mx-auto mt-3'
          src='http://ssl.gstatic.com/accounts/ui/avatar_2x.png'
          height='150'
          width='150'
          alt='avatar'
          style={{}}
        />
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
              <li className='list-group-item'>
                {cardCTA()}
              </li>
            </ul>
          </RenderForm>
        </div>
      </div>
    )
  }


  const profileDisplay = auth.isLoggedIn ? profileCard() : <div className='text-white'>Log in to see your profile</div>

  return (
    <div className='d-flex flex-column m-3'>
      {profileDisplay}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}


export default connect(mapStateToProps, { logout, updateUser })(SidebarProfile);