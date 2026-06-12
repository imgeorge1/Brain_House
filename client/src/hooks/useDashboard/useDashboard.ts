import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { DashboardTypes } from "../../types/Types";

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const useDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const token = localStorage.getItem("accessToken");
  const parsedUser = token ? parseJwt(token) : null;
  

  const checkAdmin =
    currentUser?.email === "beka.lomsadze.1@btu.edu.ge" ||
    currentUser?.email === "shvangiradze22giorgi@gmail.com" ||
    currentUser?.email === "chikviladze555@gmail.com" ||
    currentUser?.email === "ubitoz133@gmail.com" ||
    currentUser?.email === "b.ejibishvili1@gmail.com";
  
const logout = () => {
    localStorage.removeItem("paid");
    localStorage.removeItem("accessToken");
    window.open(
      `${import.meta.env.VITE_SERVER_URL}/logout`,
      "_self"
    );
  };

  const handleShow = () => setShow(true);

useEffect(() => {
    // 3. Normalize the path: strip trailing slash if it exists
    const currentPath = location.pathname.endsWith("/") && location.pathname !== "/"
      ? location.pathname.slice(0, -1)
      : location.pathname;

    // 4. Kick out unauthorized users instantly
    if (currentPath === "/dashboard" && !checkAdmin) {
      navigate("/", { replace: true }); 
    }
  }, [checkAdmin, navigate, location.pathname]);

  return {
    logout,
    checkAdmin,
  };
};

export default useDashboard;
