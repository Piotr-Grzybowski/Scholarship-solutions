import { ratings, rating } from "../types";
import Score from "../score/Score";

function AverageScore({ ratings }: ratings) {
  return (
    <div>
      <span>Average score: </span>
      <Score score={getAverageScore(ratings)}></Score>
      <hr></hr>
    </div>
  );
}

export default AverageScore;

function getAverageScore(array: rating[]) {
  return Math.floor(
    array.reduce((acc, element) => {
      return (acc += element.score);
    }, 0) / array.length
  );
}
