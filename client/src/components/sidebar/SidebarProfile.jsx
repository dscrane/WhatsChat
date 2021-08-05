import React, { useState } from 'react';
import moment from 'moment';
import _ from 'lodash';
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup";
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import ConfirmationModal from '../ConfirmationModal';
import { RenderForm } from '../userForms';
import { logout, updateUser, deleteUser } from "../../redux/actions/auth";
import { pencilIcon } from "../../icons/icons";


const SidebarProfile = ({ auth, logout, updateUser, deleteUser }) => {
  const [ editing, setEditing ] = useState('')
  const [ modalDisplay, setModalDisplay ] = useState(false);
  const modalConfig = {
    title: 'Delete Account',
    message: 'Are you sure you want to delete your account?',
    btnText: 'Delete',
    btnStyle: 'danger'
  }

  const handleDelete = () => {
    deleteUser();
  }

  const handleForm = (formValues) => {
    updateUser(formValues)
    setEditing('')
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

        <div className={`row justify-content-between align-items-center ${className}`}>
          <div className='col-3 text-left p-0'>
            <label className='m-auto font-weight-bold'>
              {label}
            </label>
          </div>
          <div className='col-7'>
            {editing === label ?
              <input className='profile__input form-control text-left' {...input} /> :
              <input className='profile__input-placeholder form-control-plaintext text-left' {...input} />}
          </div>
          <div onClick={() => setEditing(label)} className='profile__cta-edit col-1'>
            {pencilIcon}
          </div>
          {renderError(meta)}
        </div>

    )
  }

  const profileCard = () => {
    return (
      <Card className='profile__card'>
        <Card.Img
          className='profile__avatar mx-auto'
          variant='top'
          src={`data:image/png;base64,${auth.data.avatar}`}
        />
        <Card.Body className='profile__body'>
          <RenderForm handleForm={handleForm} initialValues={_.pick(auth.data, 'name', 'username', 'email', 'password')}>
            <ListGroup className='profile__content' variant="flush">
              <ListGroup.Item className='profile__row px-3'>
                <Field name='name' component={renderInput} label='Name' />
              </ListGroup.Item>
              <ListGroup.Item className='profile__row px-3'>
                <Field name='username' component={renderInput} label='Username' />
              </ListGroup.Item>
              <ListGroup.Item className='profile__row px-3'>
                <Field name='email' component={renderInput} label='Email' />
              </ListGroup.Item>
              <ListGroup.Item className='profile__row px-3'>
                <Field name='password' component={renderInput} label='Password' />
              </ListGroup.Item>

            <input type="submit"
                   className='profile__submit'
                   tabIndex="-1"/>
            </ListGroup>
          </RenderForm>
        </Card.Body>
        <Card.Footer className="profile__footer">
          <ListGroup className='profile__row' variant="flush">
            <ListGroup.Item className='profile__row'>
              <div className='row justify-content-around'>
                <div className='col text-center'>
                  User Since: {moment(auth.data.createdAt).format("MMM 'YY")}
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className='profile__row'>
              <button onClick={() => logout() } className='btn btn-secondary mt-2'>
                Log Out
              </button>
            </ListGroup.Item>
            <ListGroup.Item className='profile__row'>
              <button
                onClick={() => setModalDisplay(true)}
                className='btn btn-danger'
                disabled={auth.data._id === '5f637fdd0a41ae691c828e50'}
              >
                Delete Account
              </button>
            </ListGroup.Item >
          </ListGroup>
        </Card.Footer>
      </Card>
    )
  }


  const profileDisplay = auth.isLoggedIn
    ? profileCard()
    : <div className='text-white'>Log in to see your profile</div>

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