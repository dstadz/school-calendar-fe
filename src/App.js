import React, {useState, useEffect} from 'react';
import { Route } from 'react-router-dom';

// import ReactGA from 'react-ga';

import { Stack } from '@chakra-ui/core';
import Authenticate from './components/Authenticate';
import { useAuth } from './contexts/auth';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Welcome from './components/Welcome';
import Dashboard from './components/dashboardComponents/Dashboard';
import Loading from './components/Loading';
import Mobile from './components/mobile/Mobile';

// function initializeAnalytics() {
//   ReactGA.initialize('UA-157827018-1');
//   ReactGA.pageview('/home');
// }


function App() {
  const { googleApi } = useAuth();

  const breakPoint = 768

    const [dimensions, setDimensions] = useState({ 
      height: window.innerHeight,
      width: window.innerWidth
    })
    useEffect(() => {
      function handleResize() {
        setDimensions({
          height: window.innerHeight,
          width: window.innerWidth
        })
      }
      window.addEventListener('resize', handleResize)
      return _ => {
        window.removeEventListener('resize', handleResize)
      }
      },[])

      

  const [userState, setUserState] = useState({})
  let currentUser = googleApi.currentUser
  useEffect(()=>{
    setUserState(currentUser)
  },[currentUser])


  
  
  
  
  
  if (googleApi.isLoading) {
    return <Loading />;
  }

  if(dimensions.width > breakPoint){


      if (googleApi.currentUser){
        return (
          <Stack pos="relative" w="100%" minHeight="100vh">
            <Header userState={userState} />
            <Route path="/">
              <Authenticate />
            </Route>
            {googleApi.currentUser && <Route exact path="/">
              <Welcome />
            </Route>}
            <PrivateRoute path="/:id/dashboard">
              <Dashboard setUserState={setUserState}/>
            </PrivateRoute>
          </Stack>
        );
      } else {
        return (
          <Stack pos="relative" w="100%" minHeight="100vh">
            <Header />
            <Route path="/authenticate/google">
              <Authenticate />
            </Route>
            <Route exact path="/">
              <Welcome />
            </Route>
            <PrivateRoute path="/:id/dashboard">
              <Dashboard />
            </PrivateRoute>
          </Stack>

        )
      }
} else if(dimensions.width <= breakPoint){
  return(
    <Mobile></Mobile>
  )
}
}
export default App;
