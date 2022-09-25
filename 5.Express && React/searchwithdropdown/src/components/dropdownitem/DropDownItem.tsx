import { element } from "../types";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

function DropDownItem({ name, regularPrice, salePrice }: element) {
  return (
    <ListItem disablePadding sx={{ color: "black", width: "100%" }}>
      <ListItemButton>
        <ListItemText primary={name} />
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
