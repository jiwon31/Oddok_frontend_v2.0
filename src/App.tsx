import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";
import AuthApi from "api/auth/auth-api";
// import { ErrorModal } from "components/commons";
import UserApi from "api/user-api";
import useRecoilUser from "hooks/useRecoilUser";

function App({ authApi = new AuthApi(), userApi = new UserApi() }) {
  const queryClient = new QueryClient();
  const loggedIn = Cookies.get("logged_in");
  const { user, setUser } = useRecoilUser();

  useEffect(() => {
    if (loggedIn && !user) {
      authApi
        .getNewAccessToken() //
        .then(async () => {
          const userInfo = await userApi.getUserInfo();
          setUser(userInfo);
        })
        .catch((e) => window.alert(e));
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ErrorModal /> */}
      <Outlet />
    </QueryClientProvider>
  );
}

export default App;
