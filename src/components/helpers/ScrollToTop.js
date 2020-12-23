import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Makes the page scroll to top when rendered

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
