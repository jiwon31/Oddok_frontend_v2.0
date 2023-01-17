import { Outlet } from "react-router-dom";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Outlet />
    </RecoilRoot>
  );
}

export default App;
