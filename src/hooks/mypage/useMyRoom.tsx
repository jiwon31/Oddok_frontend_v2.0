import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UserRoomApi from "api/user-room-api";
import useRecoilUser from "hooks/useRecoilUser";
import { MyRoomType } from "types/mypage";

export default function useMyRoom(userRoomApi = new UserRoomApi()) {
  const { user } = useRecoilUser();
  const queryClient = useQueryClient();

  const myRoomQuery = useQuery(["my-room", user?.id], userRoomApi.getMyRoom, {
    staleTime: 1000 * 60 * 5,
    suspense: true,
    enabled: !!user,
  });

  const updateMyRoom = useMutation(
    ({ roomId, newInfo }: { roomId: number; newInfo: MyRoomType }) => userRoomApi.updateStudyRoom(roomId, newInfo),
    {
      onSuccess: () => queryClient.invalidateQueries(["my-room", user?.id]),
    },
  );

  const deleteMyRoom = useMutation((roomId: number) => userRoomApi.deleteMyRoom(roomId), {
    onSuccess: () => queryClient.invalidateQueries(["my-room", user?.id]),
  });

  return { myRoomQuery, updateMyRoom, deleteMyRoom };
}
