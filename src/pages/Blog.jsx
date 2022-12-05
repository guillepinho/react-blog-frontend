import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';

function Blog() {
  const navigate = useNavigate();
  const { token, user } = useContext(AppContext);

  useEffect(() => {
    if (token != '') {
      
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <div>
      Blog
      <div>{ user }</div>
    </div>
  );
}

export default Blog;