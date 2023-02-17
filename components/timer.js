import React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/system/Stack";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export const Timer = React.forwardRef((props, ref) => {
  const [isRunning, setIsRunning] = React.useState(false);
  const [time, setTime] = React.useState(0);
  const [startingTime, setStartingTime] = React.useState(null);
  const [hours, setHours] = React.useState(0);

  React.useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  React.useEffect(() => {
    props.onHourIsChange(hours);
  }, [hours]);

  const handleStartAndStop = () => {
    if (startingTime === null) {
      setStartingDateTime();
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setHours(0);
    setStartingTime(null);
  };

  const setStartingDateTime = () => {
    var today = new Date();
    var curentTime =
      ("0" + today.getHours()).slice(-2) +
      ":" +
      ("0" + today.getMinutes()).slice(-2);
    setStartingTime(curentTime);
  };

  const formatTime = () => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = `${Math.floor(time / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

    if (hours < Math.floor(time / 3600)) {
      setHours(Math.floor(time / 3600));
    }

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
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
        <span ref={ref}>{formatTime()}</span>
      </Stack>
      {startingTime !== null && (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            marginBottom: "10px",
            fontSize: "11px",
          }}
        >
          <span style={{ color: "#1976d2" }}>START:</span>
          <span style={{ marginLeft: "3px" }}>{startingTime}</span>
          <span style={{ marginLeft: "4px", color: "#1976d2" }}>UHR</span>
        </Stack>
      )}
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Button variant="outlined" onClick={handleStartAndStop}>
          {isRunning ? (
            <PauseIcon></PauseIcon>
          ) : (
            <PlayArrowIcon></PlayArrowIcon>
          )}
        </Button>
        <Button variant="outlined" onClick={handleReset}>
          <RestartAltIcon></RestartAltIcon>
        </Button>
      </Stack>
    </Paper>
  );
});
