import { render, screen } from "@testing-library/react";
import AverageScore from "./AverageScore";
import renderer from "react-test-renderer";

describe("Testing AverageScore", () => {
  const data = [
    {
      recordId: "1",
      name: "",
      score: 3,
      content: "",
    },
    {
      recordId: "2",
      name: "",
      score: 5,
      content: "",
    },
    {
      recordId: "3",
      name: "",
      score: 0,
      content: "",
    },
  ];

  test("when given data, average score should render proper amount of stars", () => {
    render(<AverageScore ratings={data}></AverageScore>);
    const greyStars = screen.getAllByTestId("gray-star");
    const yellowStars = screen.queryAllByTestId("yellow-star");
    expect(greyStars.length).toBe(3);
    expect(yellowStars.length).toBe(2);
  });
  test("when given data average score should create proper snapshot", () => {
    const component = renderer
      .create(<AverageScore ratings={data}></AverageScore>)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
