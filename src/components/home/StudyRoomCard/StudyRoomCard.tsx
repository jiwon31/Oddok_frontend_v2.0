/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useRecoilValue } from "recoil";
import { bookmarkState } from "recoil/bookmark-state";
import useRecoilUser from "hooks/useRecoilUser";
import useBookmark from "hooks/home/useBookmark";
import { PasswordModal, Thumbnail, UserCount } from "components/commons";
import { Lock, Unlock, BookMark, BookMarkHeart } from "assets/icons";
import { useModal, useGoToPage } from "hooks";
import { RoomType } from "types/room";
import useToast from "hooks/useToast";
import styles from "./StudyRoomCard.module.css";

export default function StudyRoomCard({ roomData }: { roomData: RoomType }) {
  const bookmark = useRecoilValue(bookmarkState);
  const { user } = useRecoilUser();
  const { saveBookmark, removeBookmark } = useBookmark();
  const { isModal, openModal, closeModal } = useModal();
  const { goToLogin, goToSetting } = useGoToPage();
  const { successToast, errorToast } = useToast();

  const checkLoggedIn = () => {
    if (!user) {
      goToLogin();
    }
  };

  const handleStudyRoomClick = () => {
    checkLoggedIn();
    if (roomData.isPublic) {
      goToSetting(roomData.id);
    } else {
      openModal();
    }
  };
  const handleBookmarkAddBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    checkLoggedIn();
    saveBookmark.mutate(roomData.id, {
      onSuccess: () => successToast("북마크가 추가되었습니다."),
      onError: (error) => {
        if (error.status === 400) {
          errorToast("하나의 스터디룸만 북마크할 수 있습니다.");
        } else {
          throw error;
        }
      },
    });
  };
  const handleBookmarkDeleteBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    removeBookmark
      .mutateAsync() //
      .then(() => successToast("북마크가 삭제되었습니다."));
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
