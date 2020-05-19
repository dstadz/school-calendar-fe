import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Heading, Flex, Grid, Box, IconButton } from '@chakra-ui/core';
import Days from './Days';
import Cell from './Cell';
import useDate from '../hooks/useDate';

const Calendar = ({ api, selected, setSelected }) => {
  const currentDay = dayjs();

  // state to display cuurent date
  const [date, setDate] = useState(dayjs());

  // state to show users events
  const [events, setEvents] = useState(null);

  const {
    // currentDay,
    // date,
    // setDate,
    currentMonth,
    currentYear,
    daysInMonth,
    weekDayOfFirstDoM,
    weekDayOfLastDoM,
    weekDays
  } = useDate(date);

  const handlePrev = () => {
    setDate(date.subtract(1, 'month'));
  };

  const handleNext = () => {
    setDate(date.add(1, 'month'));
  };

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

  return (
    <Box className="calendar" backgroundColor="white" borderRadius="10px">
      <Flex className="header" align="center" justify="center" py={4}>
        <IconButton
          w="2em"
          aria-label="Previous Month"
          icon="prev"
          backgroundColor="transparent"
          size="lg"
          onClick={handlePrev}
        />
        <Heading className="heading">{date.format('MMMM')}</Heading>
        <IconButton
          aria-label="Next Month"
          icon="next"
          backgroundColor="transparent"
          size="lg"
          onClick={handleNext}
        />
      </Flex>
      <Grid
        className="weekdays-grid"
        templateColumns="repeat(7, 1fr)"
        textAlign="right"
        borderBottomWidth="1px"
        borderBottomColor="gray.200"
      >
        {weekDays.map(d => (
          <Cell
            className="weekdays-item"
            fontSize={['lg', '3xl']}
            height="auto"
            key={d}
          >
            {d}
          </Cell>
        ))}
      </Grid>
      <Grid
        className="calendar-days-grid"
        templateColumns="repeat(7, 1fr)"
        textAlign="right"
      >
        <Days
          events={events}
          date={date}
          selected={selected}
          setSelected={setSelected}
          weekDayOfFirstDay={weekDayOfFirstDoM}
          weekDayOfLastDay={weekDayOfLastDoM}
          daysInMonth={daysInMonth}
          currentDay={currentDay}
          currentMonth={currentMonth}
          currentYear={currentYear}
        />
      </Grid>
    </Box>
  );
};

export default Calendar;
