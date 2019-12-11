import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth/authState"
import { CalendarContext } from "../../contexts/calendar/calendarState"

import MyCalendars from "./MyCalendars"
import SubscribedCalendars from "./SubscribedCalendars"

import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core"

import TwilioMessage from "../addUserTwilioMessage/index"
import EmptyPersonAvatar from "../../assets/images/emptyperson.png"

import { makeStyles } from "@material-ui/core/styles"

// setting styles
const drawerWidth = 300
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },

  toolbar: theme.mixins.toolbar,

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  listItemContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  userProfileContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },

  upComingEventsContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(4),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
}))

const SideMenu = () => {
  const [upComingEvents, setUpComingEvents] = useState([])
  const [userCalendar, setUserCalendar] = useState(null)
  const { userProfile } = useContext(AuthContext)
  const {
    userCalendars,
    getMyCalendarEvents,
    unSubscribeCalendar,
    setShowEvents,
  } = useContext(CalendarContext)

  console.log(userCalendars)
  // set user default calendar to the select list

  useEffect(() => {
    if (userCalendars.length > 0) {
      const primaryCalendar = userCalendars.find(calendar => calendar.isDefault)
      setUserCalendar(primaryCalendar)
    }
  }, [userCalendars])

  useEffect(() => {
    if (userCalendar) {
      getMyCalendarEvents(userCalendar.uuid)
    }
  }, [userCalendar])

  // get user upcoming events

  // useEffect(() => {
  //   if (userCalendarEvents.length > 0) {
  //     const events = userCalendarEvents.filter(event =>
  //       moment(event.startTime).isAfter(),
  //     )

  //     const sorted = events
  //       .sort((a, b) => moment(a.startTime) - moment(b.startTime))
  //       .slice(0, 5)

  //     setUpComingEvents(sorted)
  //   } else {
  //     setUpComingEvents([])
  //   }
  // }, [userCalendarEvents])

  const handleCalendarChange = calendarUuid => {
    const myCalendar = userCalendars.find(
      calendar => calendar.uuid === calendarUuid,
    )

    if (myCalendar.showEvents) {
      setShowEvents(myCalendar.uuid, false)
    } else {
      getMyCalendarEvents(calendarUuid)
      setShowEvents(myCalendar.uuid, true)
    }
  }

  const handleUnsubscribeCalendar = calendarUuid => {
    unSubscribeCalendar(calendarUuid)
  }

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Drawer
        anchor="left"
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}>
        <div className={classes.toolbar} />
        <List>
          <ListItem className={classes.userProfileContainer}>
            <img src={EmptyPersonAvatar} alt="image_placeholder" />
            <Typography variant="h5">{`${userProfile.firstName} ${userProfile.lastName}`}</Typography>
            <Typography variant="h6">{userProfile.email}</Typography>
          </ListItem>
          <ListItem className={classes.listItemContainer}>
            <MyCalendars
              userCalendars={userCalendars}
              onChange={handleCalendarChange}
            />
          </ListItem>
          <Divider />
          <ListItem className={classes.subscribedCalendarsContainer}>
            <SubscribedCalendars
              userCalendars={userCalendars}
              onChange={handleCalendarChange}
              unsubscribeCalendar={handleUnsubscribeCalendar}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText className={classes.upComingEventsContainer}>
              <Typography variant="h5">Upcoming Events</Typography>
              <List dense>
                {upComingEvents.length > 0 &&
                  upComingEvents.map(event => (
                    <ListItem key={event.uuid}>
                      <ListItemText>{event.eventTitle}</ListItemText>
                    </ListItem>
                  ))}
              </List>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </div>
  )
}

export default SideMenu
