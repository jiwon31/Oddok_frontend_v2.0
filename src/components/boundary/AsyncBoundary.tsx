import LoadingSpinner from "components/commons/Loading/LoadingSpinner";
import { Suspense } from "react";
import ApiErrorBoundary from "./ApiErrorBoundary";

export default function AsyncBoundary({ children }: { children: JSX.Element }) {
  return (
    <ApiErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
    </ApiErrorBoundary>
  );
}
