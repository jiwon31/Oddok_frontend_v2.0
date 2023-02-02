import { Loading } from "components/commons";
import useAuth from "hooks/useAuth";

export default function LogoutRedirectPage() {
  const {
    logoutQuery: { isLoading },
  } = useAuth();

  return <div>{isLoading && <Loading />}</div>;
}
