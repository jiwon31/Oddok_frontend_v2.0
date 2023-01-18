import { userState } from "recoil/user-state";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

type PublicRouteProps = {
  children: JSX.Element;
  restricted: boolean;
};

function PublicRoute({ children, restricted }: PublicRouteProps) {
  const user = useRecoilValue(userState);

  if (user.isLogin && restricted) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default PublicRoute;
