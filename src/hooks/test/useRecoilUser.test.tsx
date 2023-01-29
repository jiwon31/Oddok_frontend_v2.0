import { renderHook } from "@testing-library/react";
import useRecoilUser from "hooks/useRecoilUser";
import { RecoilRoot } from "recoil";

describe("useRecoilUser", () => {
  it("default value of user is null", () => {
    const {
      result: { current },
    } = renderHook(() => useRecoilUser(), {
      wrapper: RecoilRoot,
    });

    expect(current.user).toBeNull();
  });
});
