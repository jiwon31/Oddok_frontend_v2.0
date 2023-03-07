import { NicknameEditModal } from "components/commons";
import { useModal } from "hooks";
import useRecoilUser from "hooks/useRecoilUser";
import EditButton from "../EditButton/EditButton";
import styles from "./EditNickname.module.css";

export default function EditNickname() {
  const { user } = useRecoilUser();
  const { isModal, openModal, closeModal } = useModal();

  return (
    <>
      {isModal && <NicknameEditModal onClose={closeModal} />}
      <div>
        <div className={styles.heading}>
          <h2>계정</h2>
          <EditButton onClick={openModal} />
        </div>
        <div>
          <div className={styles.sub_heading}>닉네임</div>
          <div className={styles.nickname}>{user?.nickname ?? ""}</div>
        </div>
      </div>
    </>
  );
}
