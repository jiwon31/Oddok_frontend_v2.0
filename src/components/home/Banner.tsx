import useBookmark from "hooks/home/useBookmark";
import Bookmark from "./Bookmark/Bookmark";
import TotalParticipant from "./TotalParticipant/TotalParticipant";

export default function Banner() {
  const {
    bookmarkQuery: { data: bookmark },
  } = useBookmark();

  return <div>{!bookmark ? <TotalParticipant /> : <Bookmark bookmark={bookmark} />}</div>;
}
