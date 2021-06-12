import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import AlbumCreateForm from './AlbumCreateForm';
import { createAlbum } from '../../actions/album';

const AlbumCreate = ({ isLoggedIn, createAlbum }) => {
  const onSubmit = async (formValues) => {
    await createAlbum(formValues);
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

export default connect(mapStateToProps, { createAlbum })(AlbumCreate);
