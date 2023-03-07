import { useModal } from "hooks";
import AccountDeleteModal from "../AccountDeleteModal/AccountDeleteModal";
import styles from "./DeleteAccount.module.css";

export default function DeleteAccount() {
  const { isModal, openModal, closeModal } = useModal();

  return (
    <>
      {isModal && <AccountDeleteModal onClose={closeModal} />}
      <div>
        <div className={styles.sub_heading}>위험구역</div>
        <button type="button" className={styles.delete_btn} onClick={openModal}>
          계정 삭제
        </button>
      </div>
    </>
  );
}
