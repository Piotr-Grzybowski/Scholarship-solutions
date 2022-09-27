import Rating from "./Rating";
import renderer from "react-test-renderer";

describe("Testing AverageScore", () => {
  const data = {
    recordId: "1",
    name: "John",
    score: 3,
    content: "Nice place to take a quick sip of tea",
  };

  test("when given result Rating should render with proper data", () => {
    const component = renderer.create(<Rating {...data}></Rating>).toJSON();
    expect(component).toMatchSnapshot();
  });
});
