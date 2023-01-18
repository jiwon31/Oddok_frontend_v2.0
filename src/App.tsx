import { ErrorModal } from "@components/commons";
import { Outlet } from "react-router-dom";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <ErrorModal />
      <Outlet />
    </RecoilRoot>
  );
}

export default App;
