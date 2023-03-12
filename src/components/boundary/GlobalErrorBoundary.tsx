import { Component, ReactNode } from "react";
import { ErrorType } from "types/error";
import UnknownError from "components/commons/UnknownError";
import ServerError from "pages/ServerError/ServerError";

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

  resetError = () => {
    this.setState({ shouldHandleError: false });
  };

  render() {
    const { shouldHandleError, error } = this.state;
    const { children } = this.props;

    if (!shouldHandleError) {
      return children;
    }
    // 서버 에러
    if (error?.status === 500) {
      return <ServerError onClickRetry={this.resetError} />;
    }
    return <UnknownError onClick={this.resetError} />;
  }
}
