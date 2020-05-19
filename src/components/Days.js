import React from 'react';
import { Flex, Box } from '@chakra-ui/core';
import Cell from './Cell';
import EventsIndicator from './EventsIndicator';
import useDate from '../hooks/useDate';

import { useRecoilValue } from "recoil";
import { templateFormOpen } from '../utils/atoms'


export const DisabledDays = ({ days }) => {
  return (
    <div>
      {[...Array(days).keys()].map(i => (
        <Cell
          className="calendar-days-item faded"
          borderBottomWidth="1px"
          borderBottomColor="gray.200"
          key={i}
        >
          <Box backgroundColor="gray.100" h="100%" />
        </Cell>
      ))}
    </div>
  );
};

const Days = ({ events, date, selected, setSelected }) => {
  const {
    daysInMonth,
    currentDay,
    currentMonth,
    currentYear,
    weekDayOfFirstDoM,
    weekDayOfLastDoM
  } = useDate(date);

  const templateForm = useRecoilValue(templateFormOpen)
  return (
    <>
      <DisabledDays days={weekDayOfFirstDoM} />
      {[...Array(daysInMonth).keys()].map(i => {
        // day is determined by items index + 1
        const day = i + 1;

        // used highlight current day
        const isToday =
          day === currentDay.date() &&
          currentMonth === currentDay.month() &&
          currentYear === currentDay.year();

        const isPicked = selected.includes(
          `${currentYear}-${currentMonth + 1 < 10 ? 0 : ''}${currentMonth +
            1}-${day < 10 ? 0 : ''}${day}`
        );

        const handleSelected = () => {
          //dateTime: "2020-02-28T08:30:00-08:00"

          //concatinated to w/ turnary to put into correct format
          const newdate = date
            .format('YYYY-MM')
            .concat(`-${day < 10 ? 0 : ''}${day}`);

          templateForm
            ? selected.includes(newdate)
              ? setSelected(selected.filter(date => date !== newdate))
              : setSelected(selected.concat(newdate))
            : alert('pick a template');
          console.log(selected);
        };

        return (
          <Cell
            className="calendar-days-item"
            borderBottomWidth="1px"
            borderBottomColor="gray.200"
            key={i}
          >
            <Flex
              direction="column"
              align="center"
              justify="space-between"
              h="100%"
              py={[1, 8]}
              backgroundColor={isPicked ? 'brand.blue_primary' : 'inherit'}
              color={isPicked ? 'white' : 'inherit'}
              onClick={handleSelected}
            >
              <Box
                as="span"
                fontSize={['xl', '2xl']}
                fontWeight={700}
                color={isToday ? 'brand.blue_primary' : 'inherit'}
              >
                {day}
              </Box>
              {events &&
                events.map(event => (
                  <div key={event.id}>
                    <EventsIndicator
                      event={event}
                      day={day}
                      currentMonth={currentMonth}
                      currentYear={currentYear}
                    />
                  </div>
                ))}
            </Flex>
          </Cell>
        );
      })}
      <DisabledDays days={6 - weekDayOfLastDoM} />
    </>
  );
};

export default Days;
