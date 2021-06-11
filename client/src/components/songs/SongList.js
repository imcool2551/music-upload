import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

const SongList = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="ui container">
      <h4>앨범 추가하기</h4>
      <Link to="/album/new">
        <i className="plus square outline icon"></i>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

export default connect(mapStateToProps)(SongList);
