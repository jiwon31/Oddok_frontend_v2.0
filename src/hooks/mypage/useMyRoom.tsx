import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UserRoomApi from "api/user-room-api";
import useRecoilUser from "hooks/useRecoilUser";

export default function useMyRoom(userRoomApi = new UserRoomApi()) {
  const { user } = useRecoilUser();
  const queryClient = useQueryClient();

  const myRoomQuery = useQuery(["my-room", user?.id], userRoomApi.getMyRoom, {
    staleTime: 1000 * 60 * 5,
    suspense: true,
    enabled: !!user,
  });

  const deleteMyRoom = useMutation((roomId: number) => userRoomApi.deleteMyRoom(roomId), {
    onSuccess: () => queryClient.invalidateQueries(["my-room", user?.id]),
  });

  return { myRoomQuery, deleteMyRoom };
}
