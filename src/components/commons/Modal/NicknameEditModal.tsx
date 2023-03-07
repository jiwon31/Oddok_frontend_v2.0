import { useState, useRef } from "react";
import useRecoilUser from "hooks/useRecoilUser";
import { Modal, Input } from "components/commons";
import { useInput } from "hooks";
import useNickname from "hooks/useNickname";
import useToast from "hooks/useToast";
import styles from "./NicknameEditModal.module.css";

export default function NicknameEditModal({ onClose }: { onClose: () => void }) {
  const { user } = useRecoilUser();
  const [nickname, setNickname] = useState(user?.nickname);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const { updateNickname } = useNickname();
  const { successToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setIsDisabled(true);
    } else if (e.target.value && isDisabled) {
      setIsDisabled(false);
    }
    setNickname(e.target.value);
  };

  const editNickname = async (name: string) =>
    updateNickname.mutate(name, {
      onSuccess: () => {
        successToast("닉네임 수정이 완료되었습니다.");
        onClose();
      },
    });

  const { pressEnter } = useInput(inputRef, () => editNickname(nickname!), isDisabled);

  const content = (
    <label htmlFor="nickname">
      <p className={styles.content}>닉네임</p>
      <Input ref={inputRef} value={nickname} maxLength={8} onChange={handleChange} onKeyPress={pressEnter} />
    </label>
  );

  return (
    <Modal
      title="닉네임 수정"
      content={content}
      onClose={onClose}
      onAction={{
        text: "확인",
        action: () => editNickname(nickname!),
      }}
      disabled={isDisabled}
    />
  );
}
