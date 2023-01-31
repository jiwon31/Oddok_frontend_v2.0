import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthApi from "api/auth/auth-api";
import UserApi from "api/user-api";
import { Loading } from "components/commons";
import Cookies from "js-cookie";
import useRecoilUser from "hooks/useRecoilUser";

export default function RedirectPage({ authApi = new AuthApi(), userApi = new UserApi() }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUser } = useRecoilUser();
  const navigate = useNavigate();
  const authCode = new URL(window.location.href).searchParams.get("code")!;

  useEffect(() => {
    setIsLoading(true);
    authApi
      .login(authCode) //
      .then(async () => {
        const user = await userApi.getUserInfo();
        setUser(user);
        Cookies.set("logged_in", "yes", { path: "/", expires: 30 });
        navigate("/");
      })
      .catch((e) => console.log(e.response))
      .finally(() => setIsLoading(false));
  }, []);

  return <div>{isLoading && <Loading />}</div>;
}
