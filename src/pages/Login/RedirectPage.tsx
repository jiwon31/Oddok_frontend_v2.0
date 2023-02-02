import { Loading } from "components/commons";
import useAuth from "hooks/useAuth";

export default function RedirectPage() {
  const authCode = new URL(window.location.href).searchParams.get("code")!;
  const {
    loginQuery: { isLoading },
  } = useAuth(authCode);

  return <div>{isLoading && <Loading />}</div>;
}
