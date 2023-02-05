import { Component, ReactNode } from "react";
import UnknownError from "components/commons/UnknownError";
import ServerError from "pages/ServerError/ServerError/ServerError";

type Props = {
  children: ReactNode;
};
type State = {
  shouldHandleError: boolean;
  error?: ErrorType;
};
type ErrorType = {
  status: number;
  data: {
    message?: string;
  };
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
    // 서버 에러
    if (error?.status === 500) {
      return <ServerError onClickRetry={() => this.setState({ shouldHandleError: false })} />;
    }
    return <UnknownError onClick={() => this.setState({ shouldHandleError: false })} />;
  }
}