import styles from "./EditButton.module.css";

export default function EditButton({ onClick, deleteBtn }: { onClick: () => void; deleteBtn?: boolean }) {
  return (
    <button className={styles.button} type="button" onClick={onClick}>
      {!deleteBtn ? "수정" : "삭제"}
    </button>
  );
}
