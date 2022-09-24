import Rating from "../rating/Rating";
import AverageScore from "../averagescore/AverageScore";
import { ratings } from "../types";

function RatingsList({ ratings }: ratings) {
  const tenFirstRatings = ratings.length > 10 ? ratings.slice(0, 10) : ratings;
  return (
    <div>
      <AverageScore ratings={ratings}></AverageScore>
      {tenFirstRatings.map((element, index) => {
        return <Rating {...element} key={index}></Rating>;
      })}
    </div>
  );
}

export default RatingsList;
