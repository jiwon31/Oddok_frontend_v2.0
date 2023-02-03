import TotalParticipant from "./TotalParticipant/TotalParticipant";

export default function Banner() {
  // TODO:
  // 로그인 하지 않음 or 로그인했는데 북마크 없음 => 전체 인원수
  // 로그인했고 북마크 있음 => 북마크
  // useQuery bookmark user.id 없으면 enabled

  return (
    <div>
      {/* 북마크 있으면 북마크 보여주고 없으면 전체인원수 북마크 or 전체인원수 */}
      {/* {!bookmark ? <TotalParticipant /> : <Bookmark bookmark={bookmark} />} */}
      <TotalParticipant />
    </div>
  );
}
