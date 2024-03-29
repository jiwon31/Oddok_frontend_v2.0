import { Thumbnail } from "assets/icons";
import { MyRoomType } from "types/mypage";
import styles from "./Room.module.css";

export default function Room({ roomData }: { roomData: MyRoomType }) {
  return (
    <div className={styles.box}>
      <div className={styles.thumbnail_box}>
        <Thumbnail />
      </div>
      <div className={styles.info_box}>
        <div className={styles.title}>{roomData.name}</div>
        <div>
          {roomData.hashtags.map((hashtag) => (
            <span key={hashtag}>#{hashtag} </span>
          ))}
        </div>
        <div>{roomData.endAt} 까지</div>
      </div>
    </div>
  );
}
