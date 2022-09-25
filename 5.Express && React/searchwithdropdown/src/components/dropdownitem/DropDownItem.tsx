import { element, phrase } from "../types";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import HighLighter from "../highlighter/HighLighter";

function DropDownItem({
  name,
  regularPrice,
  salePrice,
  phrase,
}: element & phrase) {
  return (
    <ListItem disablePadding sx={{ color: "black", width: "100%" }}>
      <ListItemButton>
        <ListItemText
          primary={<HighLighter phrase={phrase} name={name}></HighLighter>}
        />
        <span style={{ display: "flex" }}>
          <ListItemText
            primary={`$${regularPrice}`}
            sx={{
              textAlign: "right",
              textDecoration: "line-through",
              marginRight: "10px",
            }}
          />
          <ListItemText primary={`$${salePrice}`} sx={{ textAlign: "right" }} />
        </span>
      </ListItemButton>
    </ListItem>
  );
}
export default DropDownItem;
