import React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/system/Stack";
import Button from "@mui/material/Button";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Moment from "moment";

/** 
 * Clockin.js is a modified version of the standard timer (timer.js). 
 * By default, it bills worktime in 15-minute intervals, although this can be adjusted if necessary. 
 * This means that the starting time of a shift is rounded to the nearest quarter-hour before or after the clockin time. 
 * For example, if someone clocks in at 13:23, their shift will start at 13:30. 
 * However, if they clock in at 13:17, the shift will have already been running for 2 minutes.
 * 
 * credits to my boi Levent (follow him on twitter @levent_io) for a smarter way of keeping the worktime up to date. 
*/

export const Clockin = React.forwardRef((props, ref) => {
  const [isClockedIn, setIsClockedIn] = React.useState(false);
  const [clockedInAt, setClockedInAt] = React.useState(new Date());
  const [workTimeInSeconds, setWorkTimeInSeconds] = React.useState(0);

  React.useEffect(() => {
    if (isClockedIn) {
      const rounded = getClockedInRoundedDate();
      setClockedInAt(rounded);
    }
  }, [isClockedIn]);

  React.useEffect(() => {
    let interval = null;
    if (isClockedIn) {
      interval = setInterval(() => {
        const currentTime = new Date();
        const seconds = calculateSecondsBetweenTwoDates(
          currentTime,
          clockedInAt
        );
        if (seconds > 0) {
          setWorkTimeInSeconds(seconds);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [clockedInAt]);

  React.useEffect(() => {
    console.log(workTimeInSeconds);
  }, [workTimeInSeconds]);

  const calculateSecondsBetweenTwoDates = (first, second) => {
    return Math.round((first.getTime() - second.getTime()) / 1000);
  };

  const getClockedInRoundedDate = () => {
    var currentTime = new Date();
    const minutes = 15;
    const ms = 1000 * 60 * minutes;
    const roundedDate = new Date(Math.round(currentTime.getTime() / ms) * ms);
    return roundedDate;
  };

  const handleClockInClockOut = () => {
    setIsClockedIn(!isClockedIn);
  };

  const formatShiftStartDate = () => {
    return (
      <>
        <span style={{ color: "#1976d2" }}>START:</span>
        <span style={{ marginLeft: "3px" }}>
          {Moment(clockedInAt).format("HH:mm")}
        </span>
        <span style={{ marginLeft: "3px", color: "#1976d2" }}>UHR</span>
      </>
    );
  };

  const formatWorkTime = () => {
    const seconds = ("0" + (workTimeInSeconds % 60)).slice(-2);
    const minutes = ("0" + (Math.floor(workTimeInSeconds / 60) % 60)).slice(-2);
    const hours = ("0" + Math.floor(workTimeInSeconds / 3600)).slice(-2);
    return hours + " : " + minutes + " : " + seconds;
  };

  return (
    <Paper
      sx={{
        padding: "10px",
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          fontSize: "21px",
        }}
      >
        <span ref={ref}>{formatWorkTime()}</span>
      </Stack>
      {isClockedIn && (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            fontSize: "11px",
          }}
        >
          {formatShiftStartDate()}
        </Stack>
      )}
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{
          marginTop: "10px",
        }}
      >
        <Button
          variant="outlined"
          onClick={handleClockInClockOut}
          color={isClockedIn ? "error" : "success"}
        >
          {isClockedIn ? "Ausstempeln" : "Einstempeln"}
        </Button>
      </Stack>
    </Paper>
  );
});
