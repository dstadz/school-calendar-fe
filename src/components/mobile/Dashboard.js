import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@chakra-ui/core';
import axios from 'axios';
import { useAuth } from '../../contexts/auth';
import Calendar from './Calendar';
import dayjs from 'dayjs';


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

const Dashboard = ({ setUserState }) => {
  const { googleApi, api } = useAuth();

  const [templateList, setTemplateList] = useState([]);
  const [templateFormOpen, setTemplateFormOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [shadow, setShadow] = useState("");
  const { currentUser, handleSignOut } = googleApi;


  useEffect(() => {
    (async () => {
      const templates = await getTemplateList(currentUser);
      setTemplateList(templates);
    })();
  }, [currentUser, formOpen]);

  //highlights calendar based on whether choose dates button is active or not
  useEffect(() => {
    if (templateFormOpen) {
      setShadow("0px 0px 19px 7px rgba(99,179,237,1)")
    } else {
      setShadow("");
    }
  }, [templateFormOpen])
  
  //end months
  const [numOfMonths, setNumOfMonths] = useState(24);
  //start of months
  const [startMonth, setStartMonth] = useState(0);
  const [months, setMonths] = useState([])
  const [reloadMonths, setReloadMonths] = useState([])
  useEffect(()=>{
    setMonths(nextMonth(startMonth, numOfMonths));
  },[numOfMonths])
  

  const nextMonth = (start, end) => {
    let arr = [];
    for(let i=start; i<end; i++){
      arr.push(dayjs().add(i,'month'));
    }
    return arr;
  }



  // state to show users events
  const [events, setEvents] = useState(null);

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

  const[visibleMonths, setVisibleMonths] = useState({start: 0, end: 12})



  return (
    <Box
      pos="relative"
      backgroundColor="brand.lightgray"
      p={[4, 16]}
      minHeight="100vh"
    >
      <Grid
        width="100%"
        gap={4}
        templateColumns={['1fr', '250px 1fr']}
        gridTemplateAreas={["'sidebar' 'main'", "'sidebar main'"]}
      >
        <Box className="calendarArea" gridArea="main" style={{ boxShadow: shadow }}>
          {months.map((thisMonth, i)=>{
            return <Calendar 
            key={i}
            api={api}
            i={i}
            selected={selected}
            setSelected={setSelected}
            templateFormOpen={templateFormOpen}
            setTemplateFormOpen={setTemplateFormOpen}
            events={events}
            month={thisMonth}
            monthList={months}
            setMonths={setMonths}
            numOfMonths={numOfMonths}
            setNumOfMonths={setNumOfMonths}
            setStartMonth={setStartMonth}
            startMonth={startMonth}
            reloadMonths={reloadMonths}
            setReloadMonths={setReloadMonths}
            visibleMonths={visibleMonths}
            setVisibleMonths={setVisibleMonths}
          />
          })}
          
        </Box>
      </Grid>
    </Box>
  );
};

export default Dashboard;
