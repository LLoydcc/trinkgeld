import { useState } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import Snackbar from '@mui/material/Snackbar';

export default function Error(props) {
  const [open, setOpen] = useState(props.open);
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
      <Alert onClose={() => setOpen(false)} severity="error" sx={{ width: "100%" }}>
        {props.text}
      </Alert>
    </Snackbar>
  );
}
