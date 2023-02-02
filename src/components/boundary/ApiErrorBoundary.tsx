import ApiError from "api/error/ApiError";
import { ErrorModal } from "components/commons";
import ServerError from "pages/ErrorPage/ServerError/ServerError";
import { Component, ReactNode } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};
type State<ErrorType extends Error> = {
  shouldHandleError: boolean;
  shouldRethrow: boolean;
  error?: ErrorType;
};

export default class GlobalErrorBoundary extends Component<Props, State<ApiError>> {
  state: State<ApiError> = {
    shouldHandleError: false,
    shouldRethrow: false,
    error: undefined,
  };

  static getDerivedStateFromError(error: ApiError): State<ApiError> {
    // TODO: 처리할 수 없는 에러라면
    // if (error) {
    //   return {
    //     shouldHandleError: false,
    //     shouldRethrow: true,
    //     error,
    //   };
    // }
    return {
      shouldHandleError: true,
      shouldRethrow: false,
      error,
    };
  }

  render() {
    const { shouldHandleError, shouldRethrow, error } = this.state;
    const { children } = this.props;

    if (shouldRethrow) {
      throw error;
    }
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
    // TODO: 에러 컴포넌트 콜백으로 받아서 리턴. 없으면 에러모달?(default)
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
