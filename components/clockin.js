import React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/system/Stack";
import Button from "@mui/material/Button";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

/*
clockin works a bit different than a normal timer (as timer.js). 

In the default usecase the worktime gets billed in 15min. sequences (can be adjusted if needed later). 
So there's no need to display the time every second and minute. Also we will use a rounded time for the clockin - 
meaning if we clockin @ 13:17 the worktime starts at 13:15. If we clock in @ 13:25, the worktime starts at 13:30.
*/

export const Clockin = React.forwardRef((props, ref) => {
  const [isClockedIn, setIsClockedIn] = React.useState(false);
  const [workTimeInSeconds, setWorkTimeInSeconds] = React.useState(0);
  const [clockedInAt, setClockedInAt] = React.useState(null);
  const [shiftIsRunning, setShiftIsRunning] = React.useState(false);
  const [hours, setHours] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [reset, setReset] = React.useState(false);

  React.useEffect(() => {
    let interval = null;
    if (isClockedIn) {
      initClockedInRoundedDate();
      interval = setInterval(() => {
        setWorkTimeInSeconds((workTimeInSeconds) => workTimeInSeconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isClockedIn]);

  React.useEffect(() => {
    if (!shiftIsRunning) {
      const current = new Date();
      if (clockedInAt != null && current >= clockedInAt) {
        setShiftIsRunning(true);
      }
    } else {
      const count = Math.floor(workTimeInSeconds / 3600);
      if (hours < count) {
        setHours(count);
      }
    }
  }, [workTimeInSeconds]);

  React.useEffect(() => {
    props.onHourChange(hours);
  }, [hours]);

  React.useEffect(() => {
    if (shiftIsRunning) {
      const seconds = calculateSecondsBetweenTwoDates(clockedInAt, new Date());
      setWorkTimeInSeconds(seconds);
    }
  }, [shiftIsRunning]);

  const calculateSecondsBetweenTwoDates = (first, second) => {
    return Math.round(Math.abs(first.getTime() - second.getTime()) / 1000);
  };

  const handleClockInClockOut = () => {
    setIsClockedIn(!isClockedIn);
  };

  const handleReset = () => {
    setOpenDialog(true);
  };

  const handleResetAgree = () => {
    setWorkTimeInSeconds(0);
    setIsClockedIn(false);
    setClockedInAt(null);
    setShiftIsRunning(false);
    setHours(0);
    setOpenDialog(false);
  };

  const initClockedInRoundedDate = () => {
    var currentTime = new Date();
    const minutes = 15;
    const ms = 1000 * 60 * minutes;
    const roundedDate = new Date(Math.round(currentTime.getTime() / ms) * ms);
    setClockedInAt(roundedDate);
  };

  const formatShiftStartDate = () => {
    return (
      <>
        <span style={{ color: "#1976d2" }}>START:</span>
        <span style={{ marginLeft: "3px" }}>
          {("0" + clockedInAt.getHours()).slice(-2) +
            ":" +
            ("0" + clockedInAt.getMinutes()).slice(-2)}
        </span>
        <span style={{ marginLeft: "4px", color: "#1976d2" }}>UHR</span>
      </>
    );
  };

  const formatWorkTime = () => {
    const getHours = `0${Math.floor(workTimeInSeconds / 3600)}`.slice(-2);
    const minutes = `${Math.floor(workTimeInSeconds / 60)}`;
    const getMinutes = `${minutes % 60}`;
    const quarters = Math.floor(getMinutes / 15);
    let getQuarters = ``;
    switch (quarters) {
      case 0:
        getQuarters = `00`;
        break;
      case 1:
        getQuarters = `15`;
        break;
      case 2:
        getQuarters = `30`;
        break;
      case 3:
        getQuarters = `45`;
        break;
      default:
        break;
    }

    return `${getHours} : ${getQuarters}`;
  };

  return (
    <Paper
      sx={{
        padding: "10px",
      }}
    >
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Zeit zurücksetzen?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Alle nicht gespeicherten Änderungen gehen verloren und können nicht
            wiederhergestellt werden.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Nein</Button>
          <Button onClick={() => handleResetAgree()} autoFocus>
            Ja
          </Button>
        </DialogActions>
      </Dialog>
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
      {clockedInAt !== null && (
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
        <Button variant="outlined" onClick={handleReset}>
          <RestartAltIcon></RestartAltIcon>
        </Button>
      </Stack>
    </Paper>
  );
});
