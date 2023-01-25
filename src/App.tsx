import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorModal } from "components/commons";
import { Outlet } from "react-router-dom";
import { RecoilRoot } from "recoil";

function App() {
  const queryClient = new QueryClient();

  return (
    <RecoilRoot>
      <ErrorModal />
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
