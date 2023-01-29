import { useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "recoil/user-state";
import { NicknameEditModal } from "components/commons";
import { KAKAO_LOGOUT_URL } from "api/auth/kakao";
import { useModal, useOutSideClick } from "hooks";
import { Profile } from "assets/icons";
import styles from "./UserInfo.module.css";

export default function UserInfo() {
  const user = useRecoilValue(userState)!;
  const [isDropdown, setIsDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isModal, openModal, closeModal } = useModal();

  const handleProfileClick = () => setIsDropdown((prev) => !prev);
  const handleNicknameEditBtnClick = () => {
    openModal();
    setIsDropdown(false);
  };

  useOutSideClick(dropdownRef, () => setIsDropdown(false));

  return (
    <>
      {isModal && <NicknameEditModal onClose={closeModal} />}
      <div className={styles.user_info} ref={dropdownRef}>
        <button type="button" className={styles.profile} onClick={handleProfileClick}>
          <Profile />
          <span className={styles.nickname}>{user.nickname}</span>
        </button>
        {isDropdown && (
          <ul className={styles.info_buttons}>
            <li>
              <button type="button" className={styles.button} onClick={handleNicknameEditBtnClick}>
                닉네임 수정
              </button>
            </li>
            <li>
              <a href={KAKAO_LOGOUT_URL}>
                <button type="button" className={`${styles.button} ${styles.logout}`}>
                  로그아웃
                </button>
              </a>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}
