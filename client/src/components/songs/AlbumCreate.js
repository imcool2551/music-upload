import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import AlbumCreateForm from './AlbumCreateForm';

const AlbumCreate = ({ isLoggedIn }) => {
  const onSubmit = async (formValues) => {
    console.log(formValues);
  };

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="ui container">
      <AlbumCreateForm onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

export default connect(mapStateToProps)(AlbumCreate);
