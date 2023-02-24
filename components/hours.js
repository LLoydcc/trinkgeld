import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Badge from '@mui/material/Badge';

export default function Hours({ data }) {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    setRows(data);    
  }, [data]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }}>
        <TableHead>
          <TableRow>
            <TableCell align={'center'}>Stunde</TableCell>
            <TableCell align={'center'}>Trinkgeld</TableCell>
            <TableCell align={'center'}>Touren</TableCell>
            <TableCell align={'center'}>Trinkgeld / Stunde</TableCell>
            <TableCell align={'center'}>Touren / Stunde</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            return (
              <TableRow key={row.hourCount}>
                <TableCell align={'center'}><Badge badgeContent={row.hourCount} color='primary' showZero></Badge></TableCell>
                <TableCell align={'center'}>{row.tips + '€'}</TableCell>
                <TableCell align={'center'}>{row.tours}</TableCell>    
                <TableCell align={'center'}>{row.tipsPerHour + '€'}</TableCell>    
                <TableCell align={'center'}>{row.toursPerHour}</TableCell>               
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
