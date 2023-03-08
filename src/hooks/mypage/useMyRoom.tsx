import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UserApi from "api/user-api";
import useRecoilUser from "hooks/useRecoilUser";

export default function useMyRoom(userApi = new UserApi()) {
  const { user } = useRecoilUser();
  const queryClient = useQueryClient();

  const myRoomQuery = useQuery(["my-room", user?.id], userApi.getMyRoom, {
    staleTime: 1000 * 60 * 5,
    suspense: true,
    enabled: !!user,
  });

  const deleteMyRoom = useMutation((roomId: number) => userApi.deleteMyRoom(roomId), {
    onSuccess: () => queryClient.invalidateQueries(["my-room", user?.id]),
  });

  return { myRoomQuery, deleteMyRoom };
}
