import { useState } from "react";
import { Modal, Calendar, Input, Dropdown, Textarea } from "components/commons";
import { dateParsing, dateFormatting } from "utils";
import { TARGET_TIME_OPTIONS } from "utils/constants/options";
import { Profile } from "types/mypage";
import useProfile from "hooks/mypage/useProfile";
import useToast from "hooks/useToast";
import styles from "./MyGoalEditModal.module.css";

type MyGoalEditModalProps = {
  profileData?: Profile | null;
  onClose: () => void;
};
const initialData: Profile = {
  goal: "",
  targetTime: 10,
  dday: "",
  ddayInfo: "",
};

export default function MyGoalEditModal({ profileData, onClose }: MyGoalEditModalProps) {
  const [inputData, setInputData] = useState(profileData ?? initialData);
  const isValid = inputData.dday && inputData.ddayInfo;
  const { createProfile, updateProfile } = useProfile();
  const { successToast } = useToast();

  const selectDate = (date: Date) => {
    setInputData((prev) => ({ ...prev, dday: dateFormatting(date) }));
  };
  const inputDdayInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData((prev) => ({ ...prev, ddayInfo: e.target.value }));
  };
  const selectTargetTime = (value: number) => {
    setInputData((prev) => ({ ...prev, targetTime: value }));
  };
  const inputGoal = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputData((prev) => ({ ...prev, goal: e.target.value }));
  };

  const onEditSuccess = (message: string) => {
    successToast(message);
    onClose();
  };
  const editProfile = async () => {
    if (profileData) {
      updateProfile.mutate(inputData, {
        onSuccess: () => onEditSuccess("목표 수정이 완료되었습니다."),
      });
    } else {
      createProfile.mutate(inputData, {
        onSuccess: () => onEditSuccess("새로운 목표가 추가되었습니다."),
      });
    }
  };

  const content = (
    <div className={styles.box}>
      <div className={styles.item}>
        <h3>디데이</h3>
        <div className={styles.dday}>
          <Calendar
            onChange={selectDate}
            placeholderText="날짜를 선택해주세요"
            defaultDate={inputData.dday && dateParsing(inputData.dday)}
          />
          <Input onChange={inputDdayInfo} placeholder="디데이 제목을 입력해주세요" value={inputData.ddayInfo} />
        </div>
      </div>
      <div className={styles.item}>
        <h3>공부시간</h3>
        <div>
          <Dropdown options={TARGET_TIME_OPTIONS} onSelect={selectTargetTime} defaultValue={inputData.targetTime} />
        </div>
      </div>
      <div className={styles.item}>
        <h3>목표</h3>
        <div className={styles.textarea}>
          <Textarea onChange={inputGoal} value={inputData.goal} />
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      title="목표 수정"
      content={content}
      onClose={onClose}
      onAction={{
        text: "확인",
        action: editProfile,
      }}
      disabled={!isValid}
    />
  );
}
