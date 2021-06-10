import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import SignupForm from './SignupForm';
import { signup } from '../../actions/auth';

const Signup = ({ isLoggedIn, signup }) => {
  const onSubmit = async (formValues) => {
    await signup(formValues);
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <div className="ui container">
      <SignupForm onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

export default connect(mapStateToProps, { signup })(Signup);
