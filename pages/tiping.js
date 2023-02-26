import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Average from "../components/average";
import Success from "../components/alerts/success";
import Error from "../components/alerts/error";

import Counter from "../components/counter";
import { Timer } from "../components/timer";
import { Clockin } from "../components/clockin";
import Hours from "../components/hours";

export default function Tiping() {
  const [hours, setHours] = React.useState(0);
  const [toursPerHour, setToursPerHour] = React.useState(0.0);
  const [tipsPerHour, setTipsPerHour] = React.useState(0.0);
  const [tours, setTours] = React.useState(0);
  const [tips, setTips] = React.useState(0);
  const [clockedInAt, setClockedInAt] = React.useState(new Date());
  const [clockedOutAt, setClockedOutAt] = React.useState(new Date());
  const [isClockedIn, setIsClockedIn] = React.useState(true);
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
  const [showErrorAlert, setShowErrorAlert] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [lastHourValues, setLastHourValues] = React.useState({
    tips: 0,
    tours: 0,
  });
  const timeRef = React.useRef(null);  

  React.useEffect(() => {
    setAverages();
  }, [tours, tips, hours]);

  React.useEffect(() => {
    if (hours > 0) {
      const current = {
        hourCount: hours,
        tips: tips - lastHourValues.tips,
        tours: tours - lastHourValues.tours,
        tipsPerHour: tipsPerHour,
        toursPerHour: toursPerHour,
      };
      setRows([...rows, current]);
      setLastHourValues({
        tips: tips,
        tours: tours,
      });
    }
  }, [hours]);

  function setAverages() {
    if (hours < 1) {
      setToursPerHour(tours);
      setTipsPerHour(tips);
    } else {
      setToursPerHour((tours / (hours + 1)).toFixed(2));
      setTipsPerHour((tips / (hours + 1)).toFixed(2));
    }
  }

  function onSaveWorkEntry() {  
    if(!isClockedIn){
      async function saveWorkEntry() {
        const url = "http://localhost:3000/api/workentries";
        const data = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            time: timeRef.current.textContent.split(" ").join(""),
            tours: tours,
            tips: tips,
            averageTours: toursPerHour,
            averageTips: tipsPerHour,
            start: clockedInAt,
            end: clockedOutAt, 
            hours: rows
          }),
        };
        const response = await fetch(url, data);
        const res = await response.json();
        if (res.error) {
          setShowErrorAlert(true);
        } else {
          setShowSuccessAlert(true);
        }
      }
      saveWorkEntry();
    } else {
      setOpenDialog(true);
    }    
  }

  const handleClockInClockOut = (state, start, end) => {
    setIsClockedIn(state);
    setClockedInAt(start);
    setClockedOutAt(end);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Speichern nicht möglich."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Du musst dich erst ausstempeln um die aktuelle Arbeitszeit speichern zu können.
          </DialogContentText>
        </DialogContent>
        <DialogActions>          
          <Button onClick={() => setOpenDialog(false)} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Container
        fixed
        sx={{
          marginTop: "10px",
        }}
      >
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Clockin
              onHourChange={(hours) => setHours(hours)}
              onClockedInChange={(state, start, end) =>
                handleClockInClockOut(state, start, end)
              }
              ref={timeRef}
            ></Clockin>
          </Grid>
          <Grid xs={6}>
            <Counter
              amount={1}
              description={"touren"}
              onCounterChange={(count) => setTours(count)}
            ></Counter>
          </Grid>
          <Grid xs={6}>
            <Counter
              amount={0.5}
              description={"trinkgeld"}
              isMoney={true}
              onCounterChange={(count) => setTips(count)}
            ></Counter>
          </Grid>
          <Grid xs={6}>
            <Average title={"touren / stunde"} value={toursPerHour}></Average>
          </Grid>
          <Grid xs={6}>
            <Average
              title={"trinkgeld / stunde"}
              value={tipsPerHour}
              isMoney={true}
            ></Average>
          </Grid>
          <Grid xs={12}>
            <Hours data={rows}></Hours>
          </Grid>
          <Grid xs={12}>
            <Stack>
              {showSuccessAlert ? (
                <Success
                  text={"Speichern erfolgreich"}
                  open={showSuccessAlert}
                />
              ) : (
                <></>
              )}
              {showErrorAlert ? (
                <Error
                  text={"Speichern nicht erfolgreich"}
                  open={showErrorAlert}
                ></Error>
              ) : (
                <></>
              )}
              <Button variant="outlined" onClick={() => onSaveWorkEntry()}>
                Speichern
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
