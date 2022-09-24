import { ReactComponent as GrayStar } from "../../assets/images/grayStar.svg";
import { ReactComponent as YellowStar } from "../../assets/images/yellowStar.svg";
import { score } from "../types";

function Score({ score }: score) {
  const roundedScore = Math.floor(score);
  const amountOfStars = 5;
  let stars = [];

  for (let i = 0; i < amountOfStars; i++) {
    if (i < roundedScore) {
      stars.push(<YellowStar key={i} />);
    } else {
      stars.push(<GrayStar key={i} />);
    }
  }

  return (
    <div>
      {stars.map((star) => {
        return star;
      })}
    </div>
  );
}

export default Score;
