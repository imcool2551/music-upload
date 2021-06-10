import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getCurrentUser } from '../actions/auth';

const Header = ({ isLoggedIn, getCurrentUser }) => {
  useEffect(() => {
    const init = async () => {
      await getCurrentUser();
    };
    init();
  }, [getCurrentUser]);

  return (
    <div className="ui top menu">
      {isLoggedIn && (
        <>
          <Link className="item" to="/">
            홈
          </Link>
          <Link className="item" to="/mypage">
            내 프로필
          </Link>
        </>
      )}

      <div className="right menu">
        {isLoggedIn ? (
          <Link className="item" to="/logout">
            로그아웃
          </Link>
        ) : (
          <Link className="item" to="/login">
            로그인
          </Link>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

export default connect(mapStateToProps, { getCurrentUser })(Header);
