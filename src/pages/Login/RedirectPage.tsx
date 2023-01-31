import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
// import { useSetRecoilState } from "recoil";
// import { errorState } from "recoil/error-state";
import AuthApi from "api/auth/auth-api";
import UserApi from "api/user-api";
import { Loading } from "components/commons";
import Cookies from "js-cookie";
import useRecoilUser from "hooks/useRecoilUser";

export default function RedirectPage({ authApi = new AuthApi(), userApi = new UserApi() }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUser } = useRecoilUser();
  // const setError = useSetRecoilState(errorState);
  const authCode = new URL(window.location.href).searchParams.get("code")!;

  useEffect(() => {
    setIsLoading(true);
    authApi
      .login(authCode) //
      .then(async () => {
        const user = await userApi.getUserInfo();
        setUser(user);
        Cookies.set("logged_in", "yes", { path: "/", expires: 30 });
        return redirect("/");
      })
      .catch((e) => console.log(e.response))
      .finally(() => setIsLoading(false));
  }, []);

  return <div>{isLoading && <Loading />}</div>;
}
