import React, { useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { signup } from "../../redux/actions/user";
import { login } from "../../redux/actions/auth";
import { SignupForm, LoginForm } from "../components";

const Home = (props) => {
  const [activeForm, setActiveForm] = useState('signup');

  const handleSignup = (formValues) => {
    props.signup(formValues)
  }

  const handleLogin = (formValues) => {
    props.login(formValues)
  }

  const updateCurrentForm = () => {
    if (activeForm === 'signup') {
      setActiveForm('login')
    }
    if (activeForm === 'login') {
      setActiveForm('signup')
    }
  }

  const renderForm = () => {
    return activeForm === 'signup' ?
      <SignupForm
        handleForm={handleSignup}
      />
      :
      <LoginForm
        handleForm={handleLogin}
      />;
  }

  return (
    <div className='container align-self-center bg-dark w-50 my-auto p-3' style={{borderRadius: '5px'}}>
      <div className='row h-100 mb-2'>
        <div  className='col'>
            <button
              onClick={() => updateCurrentForm()}
              className={classNames({
                'btn w-100 btn-large': true,
                'btn-secondary': activeForm === 'signup',
                'btn-outline-secondary': activeForm === 'login'
              })}
              disabled={activeForm === 'signup'}
            >
              Sign Up Here!
            </button>
          </div>

        <div className='col'>
          <button
            onClick={() => updateCurrentForm()}
            className={classNames({
              'btn w-100 btn-large': true,
              'btn-secondary disabled': activeForm === 'login',
              'btn-outline-secondary': activeForm === 'signup'
            })}
            disabled={activeForm === 'login'}
          >
            Log In Here!
          </button>
        </div>
      </div>
        {renderForm()}
    </div>
  )
}

export default connect(null, { signup, login })(Home);

