import { useQuery } from "@tanstack/react-query";
import TimeRecordApi from "api/time-record-api";
import useRecoilUser from "hooks/useRecoilUser";
import { dateFormatting } from "utils";

export default function useTimeRecord(timeRecordApi = new TimeRecordApi()) {
  const { user } = useRecoilUser();

  const timeRecordQuery = useQuery(
    ["time-record", dateFormatting(new Date()), user?.id],
    timeRecordApi.getTodayTimeRecord,
    {
      staleTime: 1000 * 60 * 2,
      suspense: true,
      enabled: !!user,
    },
  );

  return { timeRecordQuery };
}
