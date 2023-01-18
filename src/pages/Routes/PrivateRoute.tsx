import { userState } from "recoil/user-state";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const user = useRecoilValue(userState);

  if (!user.isLogin) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default PrivateRoute;
