import { render, screen } from "@testing-library/react";
import RatingsList from "./RatingsList";
import renderer from "react-test-renderer";
import data from "../../assets/data/data.json";

describe("Testing AverageScore", () => {
  test("when given results, Ratings List should render proper components", () => {
    render(<RatingsList ratings={data.ratings}></RatingsList>);
    const ratingsList = screen.getAllByTestId("ratings-list");
    const rating = screen.getAllByTestId("rating");
    const average = screen.getAllByTestId("average-score");
    expect(average).toBeDefined();
    expect(ratingsList).toBeDefined();
    expect(rating.length).toBe(10);
  });
  test("when given data Ratings List should create proper snapshot", () => {
    const component = renderer
      .create(<RatingsList ratings={data.ratings}></RatingsList>)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
