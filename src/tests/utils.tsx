import { MemoryRouter, Routes } from "react-router-dom";

export function withRouter(routes: React.ReactElement, initialEntry = "/") {
  return (
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>{routes}</Routes>
    </MemoryRouter>
  );
}
