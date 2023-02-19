import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import Counter from "../components/counter";
import { Timer } from "../components/timer";
import { Clockin } from "../components/clockin";
import Average from "../components/average";
import Success from "../components/alerts/success";

export default function Tiping() {
  const [hours, setHours] = React.useState(0);
  const [toursPerHour, setToursPerHour] = React.useState(0);
  const [tipsPerHour, setTipsPerHour] = React.useState(0);
  const [tours, setTours] = React.useState(0);
  const [tips, setTips] = React.useState(0);
  const [showAlert, setShowAlert] = React.useState(0);
  const timeRef = React.useRef(null);

  function setAverages() {
    if (hours < 1) {
      setToursPerHour(tours);
      setTipsPerHour(tips);
    } else {
      setToursPerHour((tours / hours).toFixed(2));
      setTipsPerHour((tips / hours).toFixed(2));
    }
  }

  function onSaveWorkEntry() {
    async function saveWorkEntry() {
      const url = "http://localhost:3000/api/entries";
      const data = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          time: timeRef.current.textContent.split(" ").join(""),
          tours: tours,
          tips: tips,
          averageTours: toursPerHour,
          averageTips: tipsPerHour,
        }),
      };
      const response = await fetch(url, data);
      const res = await response.json();
      setShowAlert(true);
    }
    saveWorkEntry();
  }

  React.useEffect(() => {
    setAverages();
  }, [tours, tips, hours]);

  return (
    <React.Fragment>
      <CssBaseline />
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
            <Stack>
              {showAlert ? <Success text={"Speichern erfolgreich"} /> : <></>}
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
