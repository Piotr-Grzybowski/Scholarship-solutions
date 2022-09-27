import Score from "./Score";
import { render, screen } from "@testing-library/react";

test("given zero as a score component should render only gray stars", () => {
  render(<Score score={0} />);
  const greyStars = screen.getAllByTestId("gray-star");
  const yellowStars = screen.queryAllByTestId("yellow-star");
  expect(greyStars.length).toBe(5);
  expect(yellowStars.length).toBe(0);
});
test("given 4 as a score component should render four yellow stars and one gray", () => {
  render(<Score score={4} />);
  const greyStars = screen.getAllByTestId("gray-star");
  const yellowStars = screen.queryAllByTestId("yellow-star");
  expect(greyStars.length).toBe(1);
  expect(yellowStars.length).toBe(4);
});
