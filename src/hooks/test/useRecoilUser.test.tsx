import { act, renderHook } from "@testing-library/react";
import useRecoilUser from "hooks/useRecoilUser";
import { RecoilRoot } from "recoil";

describe("useRecoilUser", () => {
  it("default value of user is null", () => {
    const {
      result: { current },
    } = render();

    expect(current.user).toBeNull();
  });

  it("should set user state", () => {
    const fakeUser = { id: 1, nickname: "user", email: "email@gmail.com" };
    const { result } = render();

    act(() => result.current.setUser(fakeUser));
    expect(result.current.user).toBe(fakeUser);
  });

  function render() {
    return renderHook(() => useRecoilUser(), {
      wrapper: RecoilRoot,
    });
  }
});
