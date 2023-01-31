import { useEffect, useState } from "react";
import AuthApi from "api/auth/auth-api";
import { Loading } from "components/commons";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import useRecoilUser from "hooks/useRecoilUser";

export default function LogoutRedirectPage({ authApi = new AuthApi() }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUser } = useRecoilUser();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    authApi
      .logout() //
      .then(() => {
        setUser(null);
        Cookies.remove("logged_in");
        navigate("/");
      })
      .catch((e) => console.log(e.response))
      .finally(() => setIsLoading(false));
  }, []);

  return <div>{isLoading && <Loading />}</div>;
}
