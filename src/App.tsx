import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import Cookies from "js-cookie";
import { useEffect } from "react";
import AuthApi from "api/auth/auth-api";
import { userState } from "recoil/user-state";
import { ErrorModal } from "components/commons";
import UserApi from "api/user-api";

function App({ authApi = new AuthApi(), userApi = new UserApi() }) {
  const queryClient = new QueryClient();
  const loggedIn = Cookies.get("logged_in");
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    if (loggedIn && !user) {
      authApi
        .getNewAccessToken() //
        .then(async (response) => {
          if (response.result === "fail") {
            window.alert(response.message);
          }
          const userInfo = await userApi.getUserInfo();
          setUser(userInfo);
        });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorModal />
      <Outlet />
    </QueryClientProvider>
  );
}

export default App;
