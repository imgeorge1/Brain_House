import { useEffect, useState } from "react";

const useWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const check = window.innerWidth >= 768;

  useEffect(() => {
    const handleQuery = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleQuery);

    return () => {
      window.removeEventListener("resize", handleQuery);
    };
  }, [check]);

  return width;
};

export default useWidth;
