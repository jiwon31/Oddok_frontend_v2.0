import { useQuery } from "@tanstack/react-query";
import TimeRecordApi from "api/time-record-api";
import useRecoilUser from "hooks/useRecoilUser";

export default function useTimeRecord(selectedDate: string, timeRecordApi = new TimeRecordApi()) {
  const { user } = useRecoilUser();

  const timeRecordQuery = useQuery(
    ["time-record", user?.id, selectedDate],
    () => timeRecordApi.getTimeRecordByDate(selectedDate),
    {
      staleTime: 1000 * 60 * 5,
      suspense: true,
      enabled: !!user,
    },
  );

  return { timeRecordQuery };
}
