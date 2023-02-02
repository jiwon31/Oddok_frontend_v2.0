import ApiError from "api/error/ApiError";
import { ErrorModal } from "components/commons";
import ServerError from "pages/ErrorPage/ServerError/ServerError";
import { Component, ReactNode } from "react";

type Props = {
  children: ReactNode;
};
type State<ErrorType extends Error> = {
  shouldHandleError: boolean;
  error?: ErrorType;
};

export default class GlobalErrorBoundary extends Component<Props, State<ApiError>> {
  state: State<ApiError> = {
    shouldHandleError: false,
    error: undefined,
  };

  static getDerivedStateFromError(error: ApiError): State<ApiError> {
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
    return (
      <ErrorModal
        content="에러가 발생했습니다. 잠시후 다시 시도해주세요."
        onClose={() => this.setState({ shouldHandleError: false })}
        onAction={{
          text: "다시 시도하기",
          action: () => this.setState({ shouldHandleError: false }),
        }}
      />
    );
  }
}
