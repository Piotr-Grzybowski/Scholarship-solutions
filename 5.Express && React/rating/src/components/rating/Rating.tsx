import Score from "../score/Score";
import { rating } from "../types";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

function Rating({ name, score, content }: rating) {
  return (
    <ListItem
      sx={{ display: "flex", justifyContent: "space-evenly" }}
      data-testid="rating"
    >
      <ListItemIcon sx={{ marginRight: "10px", maxWidth: "25%" }}>
        <Score score={score}></Score>
      </ListItemIcon>
      <ListItemText
        primary={name}
        sx={{ marginRight: "5%", maxWidth: "10%" }}
      />
      <ListItemText
        primary={content.substring(0, 120) + "..."}
        sx={{ maxWidth: "60%", textAlign: "justify" }}
      />
    </ListItem>
  );
}

export default Rating;
