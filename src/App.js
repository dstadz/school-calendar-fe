import React from 'react';
import { Route } from 'react-router-dom';
// import ReactGA from 'react-ga';
import { Stack } from '@chakra-ui/core';
import Authenticate from './routes/Authenticate';
import { useAuth } from './contexts/auth';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Welcome from './routes/Welcome';
import Dashboard from './routes/Dashboard';
import Loading from './components/Loading';
import { RecoilRoot } from 'recoil'

// function initializeAnalytics() {
//   ReactGA.initialize('UA-157827018-1');
//   ReactGA.pageview('/home');
// }

function App() {
  const { googleApi } = useAuth();

  if (googleApi.isLoading) {
    return <Loading />;
  }

  return (
    <Stack pos="relative" w="100%" minHeight="100vh">
      <Header />
      <Route path="/authenticate/google">
        <Authenticate />
      </Route>
      <Route exact path="/">
        <Welcome />
      </Route>
      <RecoilRoot>
        <PrivateRoute path="/:id/dashboard">
          <Dashboard />
        </PrivateRoute>
      </RecoilRoot>
    </Stack>
  );
}

export default App;
