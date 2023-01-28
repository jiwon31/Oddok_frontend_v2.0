import { atom } from "recoil";
import { ErrorState } from "types/api-result";

export const errorState = atom<ErrorState | undefined>({
  key: "errorState",
  default: undefined,
});
