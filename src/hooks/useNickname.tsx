import { useMutation } from "@tanstack/react-query";
import UserApi from "api/user-api";
import useRecoilUser from "./useRecoilUser";

export default function useNickname(userApi = new UserApi()) {
  const { setUser } = useRecoilUser();

  const updateNickname = useMutation((nickname: string) => userApi.updateNickname(nickname), {
    onSuccess: (data) => setUser((prev) => ({ ...prev!, nickname: data.nickname })),
  });

  return { updateNickname };
}
