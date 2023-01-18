import renderer from "react-test-renderer";
import Footer from "../Footer";

describe("Footer", () => {
  it("renders", () => {
    const component = renderer.create(<Footer />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
