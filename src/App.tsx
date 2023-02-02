import { Outlet } from "react-router-dom";
import useAuth from "hooks/useAuth";

export default function App() {
  const { refreshQuery } = useAuth();
  refreshQuery();

  return <Outlet />;
}
