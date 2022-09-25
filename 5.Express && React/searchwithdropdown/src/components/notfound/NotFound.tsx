import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

function NotFound() {
  return (
    <ListItem sx={{ color: "black" }}>
      <ListItemText primary="Could not find any results" />
    </ListItem>
  );
}

export default NotFound;
