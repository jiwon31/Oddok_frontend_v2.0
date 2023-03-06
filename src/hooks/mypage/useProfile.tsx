import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import MyPageApi from "api/mypage-api";
import useRecoilUser from "hooks/useRecoilUser";
import { Profile } from "types/mypage";

export default function useProfile(myPageApi = new MyPageApi()) {
  const { user } = useRecoilUser();
  const queryClient = useQueryClient();

  const profileQuery = useQuery(["profile", user?.id], myPageApi.getProfile, {
    staleTime: 1000 * 60 * 5,
    suspense: true,
    enabled: !!user,
  });

  const createProfile = useMutation((data: Profile) => myPageApi.createProfile(data), {
    onSuccess: () => queryClient.invalidateQueries(["profile", user?.id]),
  });

  const updateProfile = useMutation((data: Profile) => myPageApi.updateProfile(data), {
    onSuccess: () => queryClient.invalidateQueries(["profile", user?.id]),
  });

  return { profileQuery, createProfile, updateProfile };
}
