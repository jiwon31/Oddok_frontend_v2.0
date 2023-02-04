import { BookmarkType } from "types/bookmark";
import { PasswordModal, UserCount } from "components/commons";
import { Thumbnail } from "assets/icons";
import { useModal, useGoToPage } from "hooks";
import { getFilteredUsersOfBookmark } from "utils/getFilteredUsersOfBookmark";
import styles from "./Bookmark.module.css";

export default function Bookmark({
  bookmark: { currentUsers, endAt, hashtags, id, isPublic, limitUsers, name, participant, rule },
}: {
  bookmark: BookmarkType;
}) {
  const users = getFilteredUsersOfBookmark(participant);
  const { isModal, openModal, closeModal } = useModal();
  const { goToSetting } = useGoToPage();

  const handleStartBtnClick = () => {
    if (isPublic) {
      goToSetting(id);
    } else {
      openModal();
    }
  };

  return (
    <>
      {isModal && <PasswordModal roomId={id} onClose={closeModal} />}
      <section className={styles.bookmark}>
        <div className={styles.count_info}>
          <div className={styles.count_icon}>
            <UserCount number={currentUsers} />
          </div>
          <div className={styles.count_box}>
            <p className={styles.text}>스터디원 {currentUsers}명이 공부 중이에요</p>
            <button className={styles.button} type="button" onClick={handleStartBtnClick}>
              바로 스터디 시작하기
            </button>
          </div>
        </div>
        <div className={styles.info}>
          <Thumbnail className={styles.thumbnail} />
          <div className={styles.detail_box}>
            <h3 className={styles.name}>{name}</h3>
            <div className={styles.info_box}>
              <p className={styles.detail}>
                <span className={styles.title}>해시태그</span>
                {hashtags.length !== 0 ? (
                  hashtags.map((hashtag) => (
                    <span key={hashtag} className={styles.content}>
                      #{hashtag}&nbsp;
                    </span>
                  ))
                ) : (
                  <span className={styles.content}>없음</span>
                )}
              </p>
              <p className={styles.detail}>
                <span className={styles.title}>인원</span>
                <span className={styles.content}>
                  {currentUsers}명 / {limitUsers}명
                </span>
              </p>
              <p className={styles.detail}>
                <span className={styles.title}>기간</span>
                <span className={styles.content}>{endAt ? `${endAt}까지` : "없음"}</span>
              </p>
              <p className={styles.rule}>
                <span className={styles.rule_title}>스터디규칙</span>
                <span className={styles.rule_content}>{rule || "없음"}</span>
              </p>
            </div>
          </div>
          <ul className={styles.users}>
            {users.map((user) => (
              <li key={user.id} className={`${styles.list} ${user.isActive && styles.active}`}>
                <span className={styles.id}>{user.id}.&nbsp;</span>
                <span className={styles.nickname}>{user.nickname ?? "현재 스터디원"}</span>
                <span className={styles.time}>{user.isActive ? `${user.joinTime} ~ 지금까지` : "없음"}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
