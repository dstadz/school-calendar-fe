import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

const Authenticate = () => {
  const { googleApi } = useAuth();
  const { currentUser } = googleApi;
  return <Redirect to={`/${currentUser.googleId}/dashboard`} />;
};

export default Authenticate;
