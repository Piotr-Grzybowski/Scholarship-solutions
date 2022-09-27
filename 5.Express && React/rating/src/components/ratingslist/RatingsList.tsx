import Rating from "../rating/Rating";
import AverageScore from "../averagescore/AverageScore";
import { ratings } from "../types";
import List from "@mui/material/List";

function RatingsList({ ratings }: ratings) {
  const tenFirstRatings = ratings.length > 10 ? ratings.slice(0, 10) : ratings;
  return (
    <List sx={{ width: "100%", maxWidth: 700 }} data-testid="ratings-list">
      <AverageScore ratings={ratings}></AverageScore>
      {tenFirstRatings.map((element, index) => {
        return <Rating {...element} key={index}></Rating>;
      })}
    </List>
  );
}

export default RatingsList;
