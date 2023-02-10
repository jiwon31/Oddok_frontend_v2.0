import AsyncError from "components/commons/AsyncError/AsyncError";
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

export default class ApiErrorBoundary extends Component<Props, State> {
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

  resetError() {
    this.setState({ shouldHandleError: false });
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
      return <ServerError onClickRetry={this.resetError} />;
    }
    return <AsyncError onClick={this.resetError} />;
  }
}
