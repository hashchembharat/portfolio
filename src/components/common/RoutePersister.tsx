import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const STORAGE_KEY = "__hb_last_path__";

export default function RoutePersister() {
  const location = useLocation();

  useEffect(() => {
    try {
      // Persist the path so if the user reloads and the server serves
      // index.html we can restore the route on initial load.
      sessionStorage.setItem(STORAGE_KEY, location.pathname + location.search);
    } catch (e) {
      // ignore storage failures
      // console.warn('RoutePersister storage failed', e);
    }
  }, [location]);

  return null;
}
