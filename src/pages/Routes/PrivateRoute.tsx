import { userState } from "recoil/user-state";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Cookies from "js-cookie";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const user = useRecoilValue(userState);
  const loggedIn = Cookies.get("logged_in");

  if (!user && !loggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default PrivateRoute;
