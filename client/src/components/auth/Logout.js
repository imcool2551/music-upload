import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { logout } from '../../actions/auth';

const Logout = ({ logout }) => {
  useEffect(() => {
    logout();
  }, [logout]);
  return <div>Logout</div>;
};

export default connect(null, { logout })(Logout);
