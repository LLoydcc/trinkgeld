import { useEffect, useState, Fragment } from "react";
import Moment from "moment";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function Overview() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function getWorkEntries() {
      const url = "http://localhost:3000/api/entries";
      const data = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(url, data);
      const res = await response.json();
      setEntries(res);
    }
    getWorkEntries();
  }, []);

  function renderEntries() {
    Moment.locale("en");
    const items = entries.map((entry) => (
      <TableRow key={entry.id}>
        <TableCell>{Moment(entry.date).format("DD.MM.YYYY")}</TableCell>
        <TableCell>{entry.time}</TableCell>
        <TableCell>{entry.tips}€</TableCell>
        <TableCell>{entry.tours}</TableCell>
      </TableRow>
    ));
    return (
      <Fragment>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Datum</TableCell>
                <TableCell>Zeit</TableCell>
                <TableCell>Trinkgeld</TableCell>
                <TableCell>Touren</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{items}</TableBody>
          </Table>
        </TableContainer>
        <Stack>
          <Link href="/tiping" passHref legacyBehavior>
            <Button
              variant="outlined"
              sx={{
                marginTop: "10px",
              }}
            >
              Neuer Eintrag
            </Button>
          </Link>
        </Stack>
      </Fragment>
    );
  }

  return <Container fixed>{renderEntries()}</Container>;
}