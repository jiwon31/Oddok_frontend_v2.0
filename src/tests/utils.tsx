import { MemoryRouter, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";

export function withRouter(routes: React.ReactElement, initialEntry = "/") {
  return (
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>{routes}</Routes>
    </MemoryRouter>
  );
}

export function withRecoil(children: React.ReactNode) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
