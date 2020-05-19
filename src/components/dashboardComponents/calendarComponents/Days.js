import React, {useState} from 'react';
import useDate from '../../../hooks/useDate';
import Day from './Day'
import DisabledDays from './DIsabledDays'



const Days = ({ events, date }) => {
  const {
    daysInMonth,
    currentDay,
    currentMonth,
    currentYear,
    weekDayOfFirstDoM,
    weekDayOfLastDoM
  } = useDate(date);

  return (
    <>
      {/* accounts for the whitespace at the beginning of the month */}
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

          //concatenated to w/ ternary to put into correct format
          const newdate = date
            .format('YYYY-MM')
            .concat(`-${day < 10 ? 0 : ''}${day}`);

          templateFormOpen
            ? selected.includes(newdate)
              ? setSelected(selected.filter(date => date !== newdate))
              : setSelected(selected.concat(newdate))
            : alert('pick a template');
          };

          

        return (
          <Day i={i} isPicked={isPicked} handleSelected={handleSelected} isToday={isToday} day={day} date={date} events={events}/>
        );
      })}

      {/* accounts for the whitespace at the end of the month */}
      <DisabledDays days={6 - weekDayOfLastDoM} />
    </>
  );
};

export default Days;
