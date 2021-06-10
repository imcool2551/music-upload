import './App.css';
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import Header from './Header';
import SongList from './songs/SongList';
import Login from './auth/Login';
import Logout from './auth/Logout';
import Signup from './auth/Signup';
import MyPage from './auth/Mypage';

import history from '../history';

const App = () => {
  return (
    <Router history={history}>
      <Header />
      <Switch>
        <Route path="/" exact component={SongList} />
        <Route path="/login" exact component={Login} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/mypage" exact component={MyPage} />
      </Switch>
    </Router>
  );
};

export default App;
