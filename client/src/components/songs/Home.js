import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import SongList from './SongList';
import { fetchSongs } from '../../actions/album';

const Home = ({ isLoggedIn, fetchSongs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  useEffect(() => {
    fetchSongs(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="ui container">
      <Link to="/album/new">
        <button className="ui blue basic button">앨범 추가</button>
      </Link>
      <div className="ui divider"></div>
      <div className="ui icon input">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <i className="circular search link icon"></i>
      </div>
      <SongList />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

export default connect(mapStateToProps, { fetchSongs })(Home);
