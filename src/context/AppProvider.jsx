import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');

  const contextType = {
    token,
    user,
    setToken,
    setUser,
  };

  return (
    <AppContext.Provider value={ contextType } displayName="blog">
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
