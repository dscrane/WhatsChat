import React, { useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { signup, login } from "../redux/actions";
import SignupForm from "./SignupForm";
import LoginForm from './LoginForm'

const Home = (props) => {
  const [activeForm, setActiveForm] = useState('signup');

  const formClass = classNames({
    'red': activeForm === 'signup',
    'blue': activeForm === 'login'
  }, 'ten wide column')

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


  console.log(activeForm)
  return (
    <div className='ui equal width equal height center aligned middle aligned padded grid'>
      <div className='two column row'>
        <div  className='red five wide column'>
            <button
              onClick={() => updateCurrentForm()}
              className={classNames('ui', {'disabled': activeForm === 'signup'}, 'large basic button')}
            >
              Sign Up Here!
            </button>
          </div>

        <div className='blue five wide column'>
          <button
            onClick={() => updateCurrentForm()}
            className={classNames('ui', {'disabled': activeForm === 'login'}, 'large basic button')}
          >
            Log In Here!
          </button>
        </div>
      </div>
      <div className={formClass}>
        {renderForm()}
      </div>
    </div>
  )
}

export default connect(null, { signup, login })(Home);

