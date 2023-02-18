import { useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SearchOption } from "types/search-option";

export default function useSearchParams() {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  const setSearchParams = useCallback(
    (key: SearchOption, value: string | null, path = pathname) => {
      if (value) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }
      navigate({
        pathname: path,
        search: searchParams.toString(),
      });
    },
    [navigate, searchParams],
  );

  return { searchParams, setSearchParams };
}
