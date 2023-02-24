import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Average(props) {
  const isMoney = props.isMoney;
  return (
    <Paper
      sx={{
        padding: "10px",
      }}
    >
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Typography variant="overline"
          style={{        
            textTransform: "uppercase",
            fontSize: "11px"
          }}
        >
          {props.title}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Typography
          variant="h6"
        >
          {props.value}
          {isMoney && "€"}
        </Typography>
      </Stack>
    </Paper>
  );
}
