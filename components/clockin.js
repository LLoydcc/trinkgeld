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
import Typography from "@mui/material/Typography";
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
  const [clockedOutAt, setClockedOutAt] = React.useState(null);
  const [isFirstInit, setIsFirstInit] = React.useState(true);
  const [hours, setHours] = React.useState(0);
  const [workTimeInSeconds, setWorkTimeInSeconds] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [reset, setReset] = React.useState(false);

  React.useEffect(() => {
    let interval = null;  
    const rounded = getRoundedQuartersDate();      
    if (isClockedIn) {
      setClockedInAt(rounded);  
      setIsFirstInit(false);          
      interval = setInterval(() => {
        const currentTime = new Date();
        const seconds = calculateSecondsBetweenTwoDates(
          currentTime,
          rounded
        );
        if (seconds > 0) {
          setWorkTimeInSeconds(seconds);
        }
      }, 1000);
    } else {                   
      clearInterval(interval);
      if(!isFirstInit){
        setClockedOutAt(getRoundedQuartersDate());
      }      
    }
    return () => {
      clearInterval(interval);
    };
  }, [isClockedIn]);

  React.useEffect(() => {    
    const minutes = Math.floor(workTimeInSeconds / 60);
    const hour = Math.floor(minutes / 60);
    if(hour > hours){
      setHours(hour);
      props.onHourChange(hour);
    } 
  }, [workTimeInSeconds]);

  React.useEffect(() => {
    if(clockedOutAt != null){
      props.onClockedInChange(isClockedIn, clockedInAt, clockedOutAt);
    }        
  }, [clockedOutAt]);

  const calculateSecondsBetweenTwoDates = (first, second) => {
    return Math.round((first.getTime() - second.getTime()) / 1000);
  };  

  const getRoundedQuartersDate = () => {
    var currentTime = new Date();
    const minutes = 15;
    const ms = 1000 * 60 * minutes;
    const roundedDate = new Date(Math.round(currentTime.getTime() / ms) * ms);
    return roundedDate;
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
    setOpenDialog(false);
  };

  const formatShiftStartDate = () => {
    return (
      <>
        <Typography sx={{ color: "#1976d2", fontSize: "11px" }} variant="overline">START:</Typography>
        <Typography sx={{ marginLeft: "3px", fontSize: "11px" }} variant="overline">
          {Moment(clockedInAt).format("HH:mm")}
        </Typography>
        <Typography style={{ marginLeft: "3px", color: "#1976d2", fontSize: "11px" }} variant="overline"variant="overline">UHR</Typography>
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
        <Typography ref={ref} variant="h5">{formatWorkTime()}</Typography>
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
          onClick={() => handleClockInClockOut()}
          color={isClockedIn ? "error" : "success"}
        >
          {isClockedIn ? "Ausstempeln" : "Einstempeln"}
        </Button>
        <Button variant="outlined" onClick={() => handleReset()}>
          <RestartAltIcon></RestartAltIcon>
        </Button>
      </Stack>
    </Paper>
  );
});
