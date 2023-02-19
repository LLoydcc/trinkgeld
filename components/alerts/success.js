import { useState } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";

export default function Success(props) {
  const [open, setOpen] = useState(true);
  return (
    <Collapse in={open}>
      <Alert
        onClose={() => {
          setOpen(false);
        }}
        sx={{ marginBottom: "10px" }}
      >
        {props.text}
      </Alert>
    </Collapse>
  );
}
