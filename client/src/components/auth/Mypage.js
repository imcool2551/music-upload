import React from 'react';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../actions/auth';

const MyPage = ({ nickname }) => {
  return <div>환영합니다 {nickname} 님</div>;
};

const mapStateToProps = (state) => {
  return {
    nickname: state.auth.nickname,
  };
};

export default connect(mapStateToProps)(MyPage);
