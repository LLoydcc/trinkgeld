import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

export default function Average(props) {
  const isMoney = props.isMoney;
  return (
    <Paper
      sx={{
        padding: "10px",
      }}
    >
      <Stack direction="row" justifyContent="center" alignItems="center">
        <h1
          style={{
            fontSize: "12px",
            fontWeight: "normal",
            textTransform: "uppercase",
          }}
        >
          {props.title}
        </h1>
      </Stack>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <p
          style={{
            fontSize: "21px",
            margin: 0,
          }}
        >
          {props.value}
          {isMoney && "€"}
        </p>
      </Stack>
    </Paper>
  );
}
