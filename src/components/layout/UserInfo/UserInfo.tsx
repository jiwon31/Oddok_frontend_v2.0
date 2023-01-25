import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "recoil/user-state";
import { NicknameEditModal } from "components/commons";
import { KAKAO_LOGOUT_URL } from "api/auth/kakao";
import { useModal } from "hooks";
import { Profile } from "assets/icons";
import styles from "./UserInfo.module.css";

export default function UserInfo() {
  const [user, setUserState] = useRecoilState(userState);
  const [isDropdown, setIsDropdown] = useState(false);
  const { isModal, openModal, closeModal } = useModal();
  const dropdownRef = useRef();

  useOutSideClick(dropdownRef, () => setIsDropdown(false));

  useEffect(() => {
    if (!user.isLogin || user.nickname !== null) {
      return;
    }
    getUserInfo()
      .then((response) => setUserState((prev) => ({ ...prev, id: response.id, nickname: response.nickname })))
      .catch((error) => console.error(error));
  }, [user.isLogin, user.nickname]);

  const handleProfileClick = () => setIsDropdown((prev) => !prev);
  const handleNicknameEditBtnClick = () => {
    openModal();
    setIsDropdown(false);
  };

  return (
    <>
      {isModal && <NicknameEditModal onClose={closeModal} />}
      <div>
        <button type="button" className={styles.profile} onClick={handleProfileClick}>
          <Profile />
          <span className={styles.nickname}>{user.nickname}</span>
        </button>
        {user.isLogin && isDropdown && (
          <ul className={styles.info_buttons}>
            <li>
              <button type="button" className={styles.button} onClick={handleNicknameEditBtnClick}>
                닉네임 수정
              </button>
            </li>
            <li>
              <a href={KAKAO_LOGOUT_URL}>
                <button type="button" className={styles.button}>
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
