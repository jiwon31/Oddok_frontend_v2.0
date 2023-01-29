import { useRecoilState } from "recoil";
import { userState } from "recoil/user-state";

export default function useRecoilUser() {
  const [user, setUser] = useRecoilState(userState);

  return { user, setUser };
}
