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
import Skeleton from "@mui/material/Skeleton";

export default function Overview() {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getWorkEntries() {
      const url = process.env.NEXT_PUBLIC_API_URL + "workentries";
      const data = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(url, data);
      const res = await response.json();      
      setEntries(res);
      setIsLoading(false);
    }
    getWorkEntries();
  }, []);

  function renderEntries() {
    Moment.locale("en");
    const items = entries.map((entry) => (
      <Link href={"/shift/" + entry.id} key={entry.id} passHref legacyBehavior>
        <TableRow sx={{cursor: 'pointer'}}>
          <TableCell>{Moment(entry.data.date).format("DD.MM.YYYY")}</TableCell>
          <TableCell>{entry.data.time}</TableCell>
          <TableCell>{entry.data.tips}€</TableCell>
          <TableCell>{entry.data.tours}</TableCell>
        </TableRow>
      </Link>
    ));
    return (
      <Fragment>
        {!isLoading ? (
          <>
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
         </>
        ) : (
          <Stack>
            <Skeleton variant="rounded" height={120} />
          </Stack>
        )}       
      </Fragment>
    );
  }

  return <Container fixed>{renderEntries()}</Container>;
}
