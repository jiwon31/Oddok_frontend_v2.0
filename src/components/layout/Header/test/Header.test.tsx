import { render, screen } from "@testing-library/react";
import useRecoilUser from "hooks/useRecoilUser";
import { Route } from "react-router-dom";
import renderer from "react-test-renderer";
import userEvent from "@testing-library/user-event";
import { fakeUser } from "tests/user";
import { withRecoil, withRouter } from "tests/utils";
import Header from "../Header";

jest.mock("hooks/useRecoilUser");
const useRecoilUserMock = useRecoilUser as jest.MockedFunction<typeof useRecoilUser>;

describe("Header", () => {
  it("renders when a user is not logged in", () => {
    useRecoilUserMock.mockImplementation(() => ({ user: null, setUser: jest.fn() }));
    snapshot();
  });

  it("renders when a user is logged in", () => {
    useRecoilUserMock.mockImplementation(() => ({ user: fakeUser, setUser: jest.fn() }));
    snapshot();
  });

  it("should go to mypage when a user logged in clicks 마이페이지 button", async () => {
    useRecoilUserMock.mockImplementation(() => ({ user: fakeUser, setUser: jest.fn() }));
    render(
      withRouter(
        <>
          <Route path="/" element={<Header />} />
          <Route path="/mypage" element={<p>mypage</p>} />
        </>,
      ),
    );

    userEvent.click(screen.getByText("마이페이지"));
    expect(await screen.findByText(/mypage/i)).toBeInTheDocument();
  });

  it("should go to studyroom create page when a user logged in clicks 새 스터디 만들기 button", async () => {
    useRecoilUserMock.mockImplementation(() => ({ user: fakeUser, setUser: jest.fn() }));
    render(
      withRouter(
        <>
          <Route path="/" element={<Header />} />
          <Route path="/studyroom/create" element={<p>create new studyroom</p>} />
        </>,
      ),
    );

    userEvent.click(screen.getByText(/새 스터디 만들기/i));
    expect(await screen.findByText(/create new studyroom/i)).toBeInTheDocument();
  });

  function snapshot() {
    const component = renderer.create(withRecoil(withRouter(<Route path="/" element={<Header />} />)));
    expect(component.toJSON()).toMatchSnapshot();
  }
});
