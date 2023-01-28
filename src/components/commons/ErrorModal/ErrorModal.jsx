import React from "react";
import { useRecoilState } from "recoil";
import { errorState } from "recoil/error-state";
import { Modal } from "components/commons";
import { useNavigate } from "react-router-dom";

function ErrorModal() {
  const navigate = useNavigate();
  const [error, setError] = useRecoilState(errorState);

  const redirect = (path = "/") => {
    setError(undefined);
    navigate(path);
  };

  return (
    error && (
      <Modal
        title="⚠️"
        content={error.userMessage ?? error.message}
        onClose={() => setError(undefined)}
        onAction={{
          text: error.action?.text ?? "홈으로 이동하기",
          action: () => redirect(error.action?.path),
        }}
      />
    )
  );
}

export default ErrorModal;
