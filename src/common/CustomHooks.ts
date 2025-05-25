import { useEffect, useState } from "react";
import { throttle } from "lodash";

export const useScrollPos = () => {
  const [currentPos, setCurrentPos] = useState(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setCurrentPos(window.scrollY);
    }, 200);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return currentPos;
};