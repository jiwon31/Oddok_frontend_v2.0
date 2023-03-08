import { useState } from "react";
import { Modal } from "components/commons";
import { SettingForm } from "components/study";
import { Room, EditButton } from "components/mypage";
import { MyRoomType } from "types/mypage";
import useMyRoom from "hooks/mypage/useMyRoom";
import useToast from "hooks/useToast";
import styles from "./MyRoomEditModal.module.css";

export default function MyRoomEditModal({ roomData, onClose }: { roomData: MyRoomType; onClose: () => void }) {
  const [inputData, setInputData] = useState(roomData);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { updateMyRoom, deleteMyRoom } = useMyRoom();
  const { successToast } = useToast();

  const editHandler = () => setIsFormOpen(true);

  const updateRoom = async () => {
    updateMyRoom.mutate(
      { roomId: roomData.id, newInfo: inputData },
      {
        onSuccess: () => {
          successToast("스터디룸 수정이 완료되었습니다.");
          onClose();
        },
      },
    );
  };

  const deleteHandler = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      deleteMyRoom.mutate(roomData.id, {
        onSuccess: () => {
          successToast("스터디룸이 삭제되었습니다.");
          onClose();
        },
      });
    }
  };

  const content = (
    <div className={styles.box}>
      <h3>생성 스터디룸</h3>
      <div className={styles.item}>
        <Room roomData={inputData} />
        <div className={styles.buttons}>
          <EditButton onClick={editHandler} />
          <EditButton onClick={deleteHandler} deleteBtn />
        </div>
      </div>
    </div>
  );
  return (
    <div>
      {isFormOpen ? (
        <SettingForm
          roomData={roomData}
          onClose={() => setIsFormOpen(false)}
          onUpdate={(data: MyRoomType) => setInputData(data)}
        />
      ) : (
        <Modal
          title="스터디룸 수정"
          content={content}
          onClose={onClose}
          onAction={{
            text: "확인",
            action: updateRoom,
          }}
        />
      )}
    </div>
  );
}
