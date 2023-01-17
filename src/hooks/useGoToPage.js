import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

function useGoToPage() {
  const navigate = useNavigate();

  const goToMain = useCallback(() => navigate("/"), [navigate]);

  const goToLogin = useCallback(() => navigate("/login"), [navigate]);

  const goToSearch = useCallback(() => navigate("/search"), [navigate]);

  const goToMyPage = useCallback(() => navigate("/mypage"), [navigate]);

  const goToCreate = useCallback(() => navigate("/studyroom/create"), [navigate]);

  const goToSetting = useCallback((id) => navigate(`/studyroom/${id}/setting`), [navigate]);

  const goToStudy = useCallback(
    (id, token) =>
      navigate(`/studyroom/${id}`, {
        state: {
          token,
        },
      }),
    [navigate],
  );

  return { goToMain, goToLogin, goToSearch, goToMyPage, goToCreate, goToSetting, goToStudy };
}

export default useGoToPage;
