import { useModal } from "hooks";
import { getDday, dateParsing } from "utils";
import { Textarea } from "components/commons";
import { MyGoalEditModal, EditButton } from "components/mypage";
import useProfile from "hooks/mypage/useProfile";
import styles from "./MyGoal.module.css";

export default function MyGoal() {
  const {
    profileQuery: { data: profileData },
  } = useProfile();
  const { isModal, openModal, closeModal } = useModal();

  return (
    <>
      {isModal && <MyGoalEditModal profileData={profileData} onClose={closeModal} />}
      <section className={styles.my_goal}>
        <div className={styles.heading}>
          <div>내 목표</div>
          <EditButton onClick={openModal} />
        </div>
        <div className={styles.contents}>
          <div>
            <div className={styles.sub_heading}>디데이</div>
            <div className={styles.box}>
              <div className={styles.bold}>{profileData ? getDday(dateParsing(profileData.dday)) : "D-DAY"}</div>
              <div>
                <div>{profileData ? profileData.ddayInfo : "날짜를 추가하세요."}</div>
                <div>
                  {profileData
                    ? `${new Date(profileData.dday).getFullYear()}. ${
                        new Date(profileData.dday).getMonth() + 1
                      }. ${new Date(profileData.dday).getDate()}`
                    : "0000. 00. 00"}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.sub_heading}>공부시간</div>
            <div className={styles.box}>
              <div className={styles.bold}>{profileData ? `${profileData?.targetTime} 시간` : "몇 시간"}</div>
              <div>/하루</div>
            </div>
          </div>
          <div className={styles.text_box}>
            <div className={styles.sub_heading}>목표</div>
            <div className={styles.text_field}>
              <Textarea
                placeholder="수정 버튼을 눌러 내 목표 또는 각오를 적어주세요."
                value={profileData?.goal}
                disabled
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
