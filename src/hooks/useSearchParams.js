import { useCallback, useMemo } from "react";
import { useNavigate, useL, useNavigateocation } from "react-router-dom";

const useSearchParams = () => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  const setSearchParams = useCallback(
    (key, value, pathname = pathname) => {
      if (value) searchParams.set(key, value);
      else searchParams.delete(key);
      navigate({
        pathname,
        search: searchParams.toString(),
      });
    },
    [navigate, searchParams],
  );

  return { searchParams, setSearchParams };
};

export default useSearchParams;
