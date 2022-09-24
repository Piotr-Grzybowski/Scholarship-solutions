import Score from "../score/Score";
import { rating } from "../types";

function Rating({ name, score, content }: rating) {
  return (
    <div>
      <span>Name: {name}</span>
      <span>
        Score: <Score score={score}></Score>
      </span>
      <span>Description: {content.substring(0, 120)}...</span>
      <hr></hr>
    </div>
  );
}

export default Rating;
