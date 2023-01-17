import { useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useSearchParams = () => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  const setSearchParams = useCallback(
    (key, value, path = pathname) => {
      if (value) searchParams.set(key, value);
      else searchParams.delete(key);
      navigate({
        pathname: path,
        search: searchParams.toString(),
      });
    },
    [navigate, searchParams],
  );

  return { searchParams, setSearchParams };
};

export default useSearchParams;
