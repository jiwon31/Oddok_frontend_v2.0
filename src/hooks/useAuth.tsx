import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import AuthApi from "api/auth/auth-api";
import UserApi from "api/user-api";
import useRecoilUser from "hooks/useRecoilUser";

export default function useAuth(authCode?: string, authApi = new AuthApi(new UserApi())) {
  const { user, setUser } = useRecoilUser();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const loggedIn = Cookies.get("logged_in");

  const loginQuery = useQuery(["login"], () => authApi.login(authCode!), {
    onSuccess: (data) => {
      setUser(data);
      Cookies.set("logged_in", "yes", { path: "/", expires: 30 });
      navigate("/");
    },
    enabled: pathname === "/login/oauth2/code/kakao",
  });

  const logoutQuery = useQuery(["logout"], () => authApi.logout(), {
    onSuccess: () => {
      setUser(null);
      Cookies.remove("logged_in");
      navigate("/");
    },
    enabled: pathname === "/logout/oauth2/code/kakao",
  });

  const refreshQuery = () =>
    useQuery(
      ["refresh"],
      () => {
        if (loggedIn && !user) {
          return authApi.getNewAccessToken();
        }
        return null;
      },
      {
        onSuccess: (data) => setUser(data),
        enabled: !(pathname === "/logout/oauth2/code/kakao"),
      },
    );

  const deleteAccount = useMutation(authApi.deleteAccount, {
    onSuccess: () => {
      setUser(null);
      Cookies.remove("logged_in");
      navigate("/");
    },
  });

  return { loginQuery, logoutQuery, refreshQuery, deleteAccount };
}
