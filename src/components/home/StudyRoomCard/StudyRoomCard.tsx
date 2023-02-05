/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useRecoilValue } from "recoil";
import { bookmarkState } from "recoil/bookmark-state";
import useRecoilUser from "hooks/useRecoilUser";
import useBookmark from "hooks/useBookmark";
import { PasswordModal, Thumbnail, UserCount } from "components/commons";
import { Lock, Unlock, BookMark, BookMarkHeart } from "assets/icons";
import { useModal, useGoToPage } from "hooks";
import styles from "./StudyRoomCard.module.css";

export default function StudyRoomCard({ roomData }) {
  const bookmark = useRecoilValue(bookmarkState);
  const { user } = useRecoilUser();
  const { saveBookmark, removeBookmark } = useBookmark();
  const { isModal, openModal, closeModal } = useModal();
  const { goToLogin, goToSetting } = useGoToPage();

  const handleStudyRoomClick = () => {
    if (roomData.isPublic) {
      goToSetting(roomData.id);
    } else {
      openModal();
    }
  };

  const handleBookmarkAddBtnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    if (!user) {
      return goToLogin();
    }
    saveBookmark.mutate(roomData.id, {
      onSuccess: () => window.alert("북마크가 추가되었습니다."),
    });
  };
  const handleBookmarkDeleteBtnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    removeBookmark
      .mutateAsync() //
      .then(() => window.alert("북마크가 삭제되었습니다."));
  };

  return (
    <>
      {isModal && <PasswordModal roomId={roomData.id} onClose={closeModal} />}
      <li className={styles.wrapper} onClick={handleStudyRoomClick}>
        <Thumbnail>
          {bookmark?.id !== roomData.id ? (
            <button type="button" className={styles.bookmark_btn} onClick={handleBookmarkAddBtnClick}>
              <BookMark />
            </button>
          ) : (
            <button type="button" className={styles.bookmark_btn} onClick={handleBookmarkDeleteBtnClick}>
              <BookMarkHeart />
            </button>
          )}
          <div className={styles.user_icon}>
            <UserCount number={roomData.currentUsers} />
            <span>/ {roomData.limitUsers}</span>
          </div>
        </Thumbnail>
        <div className={styles.description}>
          <div className={styles.title}>
            <span className={styles.ellipsis}>{roomData.name}</span>
            {roomData.isPublic ? <Unlock /> : <Lock />}
          </div>
          <div className={styles.ellipsis}>
            {roomData.hashtags.map((hashtag) => (
              <span key={hashtag}>#{hashtag} </span>
            ))}
          </div>
        </div>
      </li>
    </>
  );
}