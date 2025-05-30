import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (!window.gtag) return;

    window.gtag('config', 'G-GF4B4G785M', {
      page_path: location.pathname + location.search,
    });
  }, [location]);
}
