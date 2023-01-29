import { Link, Route } from "react-router-dom";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { withRouter } from "tests/utils";
import NotFoundPage from "../NotFoundPage";

describe("NotFound Page", () => {
  it("renders", () => {
    const component = renderer.create(withRouter(<Route path="/" element={<NotFoundPage />} />));
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("버튼을 누르면 이전 페이지로 돌아간다.", async () => {
    function PreviousPage() {
      return <Link to="*">Go to NotFound</Link>;
    }

    render(
      withRouter(
        <>
          <Route path="/" element={<PreviousPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </>,
      ),
    );

    userEvent.click(screen.getByRole("link"));
    expect(await screen.findByText(/이전 화면으로 돌아가기/i)).toBeInTheDocument();
    userEvent.click(screen.getByRole("button"));
    expect(await screen.findByText(/Go to NotFound/i)).toBeInTheDocument();
  });
});
