import { Route } from "react-router-dom";
import renderer from "react-test-renderer";
import { withRecoil, withRouter } from "tests/utils";
import Layout from "../Layout";

describe("Layout", () => {
  it("renders with children component", () => {
    const component = renderer.create(
      withRecoil(
        withRouter(
          <Route path="/" element={<Layout />}>
            <Route index element={<p>children</p>} />
          </Route>,
        ),
      ),
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
