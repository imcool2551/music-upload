import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

const SongList = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="ui container">
      <Link to="/album/new">
        <button className="ui blue basic button">앨범 추가</button>
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
