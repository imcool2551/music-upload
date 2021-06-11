import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import MypageForm from './MypageForm';
import { changePassword } from '../../actions/auth';

const MyPage = ({ isLoggedIn, nickname, changePassword }) => {
  const onSubmit = async (formValues) => {
    await changePassword(formValues);
  };

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="ui container">
      <h3>환영합니다 {nickname} 님 </h3>
      <MypageForm onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    nickname: state.auth.nickname,
  };
};

export default connect(mapStateToProps, { changePassword })(MyPage);
