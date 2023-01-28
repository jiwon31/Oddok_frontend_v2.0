import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { errorState } from "recoil/error-state";
import { userState } from "recoil/user-state";
import AuthApi from "api/auth/auth-api";
import UserApi from "api/user-api";
import { Loading } from "components/commons";
import Cookies from "js-cookie";

export default function RedirectPage({ authApi = new AuthApi(), userApi = new UserApi() }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setUser = useSetRecoilState(userState);
  const setError = useSetRecoilState(errorState);
  const authCode = new URL(window.location.href).searchParams.get("code")!;

  useEffect(() => {
    setIsLoading(true);
    authApi
      .login(authCode) //
      .then(async (response) => {
        if (response.result === "fail") {
          setError(response);
        }
        const user = await userApi.getUserInfo();
        setUser(user);
        Cookies.set("logged_in", "yes", { path: "/", expires: 30 });
        return redirect("/");
      })
      .finally(() => setIsLoading(false));
  }, []);

  return <div>{isLoading && <Loading />}</div>;
}
