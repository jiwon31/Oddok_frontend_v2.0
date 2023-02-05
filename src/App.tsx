import { Outlet } from "react-router-dom";
import useAuth from "hooks/useAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const { refreshQuery } = useAuth();
  refreshQuery();

  return (
    <>
      <Outlet />
      <ToastContainer autoClose={4000} hideProgressBar theme="dark" />
    </>
  );
}
