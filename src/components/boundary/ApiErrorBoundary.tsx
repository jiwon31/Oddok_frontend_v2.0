import { ErrorModal } from "components/commons";
import ServerError from "pages/ServerError/ServerError/ServerError";
import { Component, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { ErrorType } from "types/error";

type Props = {
  children: ReactNode;
};
type State = {
  shouldHandleError: boolean;
  error?: ErrorType;
};

export default class GlobalErrorBoundary extends Component<Props, State> {
  state: State = {
    shouldHandleError: false,
    error: undefined,
  };

  static getDerivedStateFromError(error: ErrorType): State {
    return {
      shouldHandleError: true,
      error,
    };
  }

  render() {
    const { shouldHandleError, error } = this.state;
    const { children } = this.props;

    if (!shouldHandleError) {
      return children;
    }
    // 미로그인 에러
    if (error?.status === 401) {
      return <Navigate to="/login" replace />;
    }
    // 서버 에러
    if (error?.status === 500) {
      return <ServerError onClickRetry={() => this.setState({ shouldHandleError: false })} />;
    }
    return (
      <ErrorModal
        content="에러가 발생했습니다. 잠시후 다시 시도해주세요."
        onClose={() => this.setState({ shouldHandleError: false })}
        onAction={{
          text: "다시 시도하기",
          action: () => window.location.reload(),
        }}
      />
    );
  }
}
