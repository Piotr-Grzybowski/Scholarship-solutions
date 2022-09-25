import DropDownItem from "../dropdownitem/DropDownItem";
import Divider from "@mui/material/Divider";
import NotFound from "../notfound/NotFound";
import { listOfElements } from "../types";
import List from "@mui/material/List";

function DropDownList({ elements, phrase }: listOfElements) {
  return (
    <List
      sx={{ mt: 1, width: "100%", maxWidth: 550, bgcolor: "#fff" }}
      aria-label="results"
    >
      {elements.length > 0 ? (
        elements.map((item, index) => {
          return (
            <div>
              <DropDownItem
                {...item}
                key={index}
                phrase={phrase}
              ></DropDownItem>
              <Divider />
            </div>
          );
        })
      ) : (
        <NotFound></NotFound>
      )}
    </List>
  );
}

export default DropDownList;
