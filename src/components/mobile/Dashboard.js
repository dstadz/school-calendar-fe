import React, { useState, useEffect} from 'react';
import { Box, Grid } from '@chakra-ui/core';
import axios from 'axios';
import { useAuth } from '../../contexts/auth';
import dayjs from 'dayjs';
import ConfirmDatesBtn from './ConfirmDatesBtn'
import NewInfCal from './NewInfCal'

//gets event templates from backend
const getTemplateList = async ({ googleId }) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_ENDPOINT_URL}/api/template/${googleId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const Dashboard = ({ setUserState, setFormOpen, formOpen, templateFormOpen, setTemplateFormOpen, conStart, conEnd, summ, selected, setSelected, toggleNav, setToggleNav}) => {

  //google OAuth2
  const { googleApi, api } = useAuth();
  const { currentUser, handleSignOut } = googleApi;

  const [templateList, setTemplateList] = useState([]);
  // const [templateFormOpen, setTemplateFormOpen] = useState(false);
  
  // state to show users events
  const [events, setEvents] = useState(null);


  //shadow to indicate select date mode is enabled
  const [shadow, setShadow] = useState("");
  
  //sets initial number of months to display
  const [numOfMonths, setNumOfMonths] = useState(24);

  //array which will hold all of the months on the DOM
  const [months, setMonths] = useState([])

  



  //gets event templates assigned to user from backend
  useEffect(() => {
    (async () => {
      const templates = await getTemplateList(currentUser);
      setTemplateList(templates);
    })();
  }, [currentUser, formOpen]);

  

  //dynamically sets the state of months based on the state numOfMonths
  // useEffect(()=>{
  //   setMonths(nextMonth(numOfMonths));
  //   // console.log('months', nextMonth(numOfMonths))
  // },[templateFormOpen])
  
  //helper function to loop create months in the future based on numOfMonths
  const nextMonth = (numOfMonths) => {
    let arr = [];
    for(let i=0; i<numOfMonths; i++){
      arr.push(dayjs().add(i,'month'));
    }
    return arr;
  }



  // get events from api and set to state
  useEffect(() => {
    (async () => {
      try {
        const data = await api.listEvents();
        setEvents(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [api]);


 //infinite loading stuff
const [items, setItems] = useState(nextMonth(50));

const LOADING = 1;
const LOADED = 2;
let itemStatusMap = {};

const loadMore = (startIndex, stopIndex) => {
  for (let index = startIndex; index <= stopIndex; index++) {
    itemStatusMap[index] = LOADING;
  }
  return new Promise(resolve =>
    setTimeout(() => {
      for (let index = startIndex; index <= stopIndex; index++) {
        itemStatusMap[index] = LOADED;
      }
      resolve();
    }, 2500)
  );
};


  return (
    <Box
      pos="relative"
      backgroundColor="brand.lightgray"
      // p={[4, 16]}
      maxHeight="100vh"
    >
      
      <Grid
        width="100%"
        gap={4}
        templateColumns={['1fr', '250px 1fr']}
        gridTemplateAreas={["'sidebar' 'main'", "'sidebar main'"]}
      >
        <Box className="calendarArea" gridArea="main" style={{ boxShadow: shadow }}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>

        {items.length > 0 && <NewInfCal items={items}
        api={api}
        selected={selected}
        setSelected={setSelected}
        templateFormOpen={templateFormOpen}
        setTemplateFormOpen={setTemplateFormOpen}
        events={events}
        month={items}
        monthList={items}/>}
      {toggleNav === false && <ConfirmDatesBtn conStart={conStart} conEnd={conEnd} summ={summ} selected={selected} setSelected={setSelected} toggleNav={toggleNav} setToggleNav={setToggleNav} setFormOpen={setFormOpen} setTemplateFormOpen={setTemplateFormOpen}/>}
      </div>
      {/* <button>load more months</button> */}
        
          
        </Box>
      </Grid>
    </Box>
  );
};

export default Dashboard;

