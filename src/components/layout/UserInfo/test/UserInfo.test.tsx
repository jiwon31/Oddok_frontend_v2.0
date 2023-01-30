import useRecoilUser from "hooks/useRecoilUser";
import NicknameEditModal from "components/commons/Modal/NicknameEditModal";
import { withRecoil } from "tests/utils";
import renderer from "react-test-renderer";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fakeUser } from "tests/user";
import { KAKAO_LOGOUT_URL } from "api/auth/kakao";
import UserInfo from "../UserInfo";

jest.mock("hooks/useRecoilUser");
jest.mock("components/commons/Modal/NicknameEditModal");
const useRecoilUserMock = useRecoilUser as jest.MockedFunction<typeof useRecoilUser>;
const NicknameEditModalMock = NicknameEditModal as jest.MockedFunction<typeof NicknameEditModal>;

const UserInfoComponent = withRecoil(<UserInfo />);

describe("UserInfo", () => {
  beforeEach(() => {
    useRecoilUserMock.mockImplementation(() => ({ user: fakeUser, setUser: jest.fn() }));
  });

  afterEach(() => {
    useRecoilUserMock.mockReset();
    NicknameEditModalMock.mockReset();
  });

  it("renders", () => {
    const component = renderer.create(UserInfoComponent);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("dropdown should be toggled when info button is clicked", async () => {
    render(UserInfoComponent);

    userEvent.click(screen.getByRole("button"));
    expect(await screen.findByRole("list")).toBeInTheDocument();

    userEvent.click(screen.getAllByRole("button")[0]!);
    await waitForElementToBeRemoved(screen.queryByRole("list"));
    expect(screen.queryByRole("list")).toBeNull();
  });

  it("should pops up modal when edit nickname button is clicked", async () => {
    NicknameEditModalMock.mockImplementation(() => <p>닉네임 수정 모달</p>);
    render(UserInfoComponent);

    userEvent.click(screen.getByRole("button"));
    await screen.findByRole("list");
    userEvent.click(screen.getByText(/닉네임 수정/i));
    expect(await screen.findByText("닉네임 수정 모달")).toBeInTheDocument();
  });

  it("should go to logout page when logout button is clicked", async () => {
    render(UserInfoComponent);

    userEvent.click(screen.getByRole("button"));
    await screen.findByRole("list");
    expect(screen.getByRole("link", { name: "로그아웃" })).toHaveAttribute("href", KAKAO_LOGOUT_URL);
  });
});
