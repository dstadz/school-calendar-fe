import React, {useState, useEffect} from 'react';
import {useRecoilState } from 'recoil'
import { templateFormOpen, selectedarr } from '../utils/store'

import {
  Flex,
  ButtonGroup,
  Button,
  Heading,
  IconButton
} from '@chakra-ui/core';
import { useAuth } from '../../contexts/auth';
import axios from 'axios'


//TODO LINK UP THE DAYS.JS TRIGGER TO MATCH THE TEMPLATE TOGGLE FROM A STATE WIDE SELECTION.


const ChooseDateForm = ({
  id,
  starttime,
  endtime,
  summary,
  description,
  setTemplateList,
  templateList
}) => {
  const [selected, setSelected] = useRecoilState(selectedarr)
  const [templateFormOpen, setTemplateFormOpen] = useRecoilState(templateForm);


  co //nst { googleApi, api } = useAuth();
  const deleteTemplate = async id => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_ENDPOINT_URL}/api/template/${id}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async id => {
    await deleteTemplate(id);
    const templates = templateList.filter(template => template._id !== id);
    setTemplateList(templates);
    clearSelected();
    setTemplateFormOpen(false);
  };

  const applyTemplate = (summary, description, starttime, endtime) => {
    //creates new date and isolates timezone offset
    let date = new Date().toString().split("GMT");
    //takes the first few characters of offset with + or - to be slotted in the start and end times
    let zone = date[1].split(' ')[0].slice(0, 3);
    const eventList = selected.map(e => ({
      end: { dateTime: `${e}T${endtime}:00${zone}:00` },
      start: { dateTime: `${e}T${starttime}:00${zone}:00` },
      summary: summary,
      description: description
    }));
    console.log('eventList', eventList);
    eventList.forEach(event => {
      console.log('adding event', event)
      api.addEvent(event)
    });
    setSelected([]);
    reloadPage()
  };

  const [toggledTemplate, setToggledTemplate] = useState(false);

  const openTemplate = () => {
    setTemplateFormOpen(!templateFormOpen);
    setToggledTemplate(!toggledTemplate);
    setSelected([]);
    console.log(templateFormOpen);
  };


  const clearSelected = () => {
    setSelected([]);
  }

  //triggers the refresh for the page on submiting calendar information
  const reloadPage=() =>{
    const reload=() =>{
      window.location.reload(false)
    }
    reload()
  }


  const [conStart, setConStart] = useState("");
  const [conEnd, setConEnd] = useState("");

  useEffect(()=>{
    if (starttime){
      setConStart(convertTime(starttime))
    }
    if (endtime){
      setConEnd(convertTime(endtime))
    }
  },[starttime, endtime])
  console.log('convertedstart', convertTime(starttime), 'convertedend', convertTime(endtime))




  return (
    <Flex direction="column" align="center" justify="center" my={2}>
      <Heading fontSize="sm" fontWeight="normal">
        {summary}
      </Heading>
      <Heading fontSize="sm" fontWeight="normal">
        {conStart}-{conEnd}
      </Heading>
      <Flex>
        <ButtonGroup spacing={4}>
          <Button size="sm" variantColor="blue" onClick={() => {
            openTemplate()
          }}>
            Choose Dates
          </Button>
          <IconButton
            variantColor="red"
            aria-label="Delete"
            size="sm"
            icon="close"
            onClick={() => handleDelete(id)}
          />
        </ButtonGroup>
      </Flex>

      {templateFormOpen && toggledTemplate && (
        <div>

        <button style={{margin: 2}}
          onClick={() =>
            applyTemplate(summary, description, starttime, endtime, selected)
          }
        >
          Save Events
        </button>
        <Button onClick={clearSelected}>Clear Selection</Button>
        </div>
      )}
    </Flex>
  );
};




    const convertTime = (time)=>{
      // code converts response.data.starttime to number

      console.log('TIME', time)
      if (time){

          let splitStartTime = time.split(':');
          let joinStartTime = splitStartTime.join('');
          let startTimeAsNumber = parseInt(joinStartTime, 10);
      
          // fn for converting response.data.starttime and/or endtime back to time string (from number)
          function convertToTime(value, index) {
            return value.substring(0, index) + ":" + value.substring(index);
          }
      
          // converts times from 24 hour to 12 hour format
          if (startTimeAsNumber >= 1300) {
            startTimeAsNumber -= 1200;
            let startTimeAsString = startTimeAsNumber.toString();
            let convertedStartTime = convertToTime(startTimeAsString, startTimeAsString.length - 2);
            return convertedStartTime + 'pm';
          } else {
            return time + 'am';
          }
      }
    }


export default ChooseDateForm;
