import { atom } from "recoil";

export const errorState = atom<Error | undefined>({
  key: "errorState",
  default: undefined,
});
