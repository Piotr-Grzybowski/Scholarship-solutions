import { ReactComponent as GrayStar } from "../../assets/images/grayStar.svg";
import { ReactComponent as YellowStar } from "../../assets/images/yellowStar.svg";
import { score } from "../types";

function Score({ score }: score) {
  const roundedScore = Math.floor(score);
  const amountOfStars = 5;
  const stars = createStars(roundedScore, amountOfStars);

  return (
    <div data-testid="score">
      {stars.map((star) => {
        return star;
      })}
    </div>
  );
}

function createStars(score: number, amountOfStars: number) {
  let stars = [];
  for (let i = 0; i < amountOfStars; i++) {
    if (i < score) {
      stars.push(<YellowStar key={i} data-testid={`yellow-star`} />);
    } else {
      stars.push(<GrayStar key={i} data-testid={`gray-star`} />);
    }
  }
  return stars;
}

export default Score;
