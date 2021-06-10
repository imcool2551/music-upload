import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';
import { login } from '../../actions/auth';

const Login = ({ isLoggedIn, login }) => {
  const onSubmit = async (formValues) => {
    await login(formValues);
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <div className="ui container">
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

export default connect(mapStateToProps, { login })(Login);
