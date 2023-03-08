import { useModal } from "hooks";
import { Room, EditButton, MyRoomEditModal } from "components/mypage";
import useMyRoom from "hooks/mypage/useMyRoom";
import styles from "./MyRoom.module.css";

export default function MyRoom() {
  const { isModal, openModal, closeModal } = useModal();
  const {
    myRoomQuery: { data: myRoomData },
  } = useMyRoom();

  return (
    <>
      {myRoomData && isModal && <MyRoomEditModal roomData={myRoomData} onClose={closeModal} />}
      <section>
        <div className={styles.heading}>
          <h2>생성 스터디룸</h2>
          {myRoomData && <EditButton onClick={openModal} />}
        </div>
        <div className={styles.sub_heading}>생성한 스터디룸</div>
        {myRoomData ? <Room roomData={myRoomData} /> : <div className={styles.no_content}>없습니다.</div>}
      </section>
    </>
  );
}
