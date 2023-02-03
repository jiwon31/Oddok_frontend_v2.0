import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import ErrorModal from "./ErrorModal/ErrorModal";

type UnknownErrorProps = {
  onClick: () => void;
};

export default function UnknownError({ onClick }: UnknownErrorProps) {
  const { reset } = useQueryErrorResetBoundary();
  const onClickRetry = () => {
    reset();
    onClick();
  };

  return (
    <ErrorModal
      content="에러가 발생했습니다. 잠시후 다시 시도해주세요."
      onClose={onClickRetry}
      onAction={{
        text: "다시 시도하기",
        action: onClickRetry,
      }}
    />
  );
}
