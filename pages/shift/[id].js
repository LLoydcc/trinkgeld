import React from "react";
import { useRouter } from "next/router";
import Moment from "moment";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import Average from "../../components/average";
import Hours from "../../components/hours";

export default function Shift() {
  const router = useRouter();
  const { id } = router.query;

  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState({
    id: 0,
    averageTips: "",
    averageTours: "",
    date: "",
    start: "",
    end: "",
    time: "",
    tips: "",
    tours: 0,
    hours: [],
  });

  React.useEffect(() => {
    async function fetchShiftData() {
      if (!id) {
        return;
      }
      const url = "http://localhost:3000/api/workentries/" + router.query.id;
      const data = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(url, data);
      const res = await response.json();      
      setData(res);
      setIsLoading(false);
    }
    fetchShiftData();
  }, [id]);

  return (
    <Container fixed>
      {!isLoading ? (
        <div>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <Paper
                sx={{
                  padding: "10px",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                >
                  <Typography sx={{ fontSize: "21px" }} variant="h5">
                  {Moment(data.date).format("DD.MM.YYYY")}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                >
                  <Typography
                    sx={{ fontSize: "12px", fontWeight: "500" }}
                    variant="overline"
                  >
                    {Moment(data.start).format("HH:mm") +
                      " - " +
                      Moment(data.end).format("HH:mm")}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
            <Grid xs={6}>
              <Paper
                sx={{
                  padding: "10px",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                >
                  <Typography variant="h6">{data.tips + "€"}</Typography>
                  <Typography
                    variant="overline"
                    sx={{
                      textTransform: "uppercase",
                      paddingTop: "3px",
                      fontSize: "11px",
                    }}
                  >
                    {"trinkgeld"}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
            <Grid xs={6}>
              <Paper
                sx={{
                  padding: "10px",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                >
                  <Typography variant="h6">{data.tours}</Typography>
                  <Typography
                    variant="overline"
                    sx={{
                      textTransform: "uppercase",
                      paddingTop: "3px",
                      fontSize: "11px",
                    }}
                  >
                    {"touren"}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
            <Grid xs={6}>
              <Average
                title={"trinkgeld / stunde"}
                value={data.averageTips}
                isMoney={true}
              ></Average>
            </Grid>
            <Grid xs={6}>
              <Average
                title={"touren / stunde"}
                value={data.averageTours}
              ></Average>
            </Grid>
            <Grid xs={12}>
              <Hours data={data.hours}></Hours>
            </Grid>
          </Grid>
        </div>
      ) : (
        <div>
          <></>
        </div>
      )}
    </Container>
  );
}
