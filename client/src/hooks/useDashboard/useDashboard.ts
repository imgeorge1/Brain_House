import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { DashboardTypes } from "../../types/Types";

const useDashboard = ({ currentUser, setShow }: DashboardTypes) => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("paid");
    localStorage.removeItem("accessToken");
    window.open(
      // change for production
      `${import.meta.env.VITE_SERVER_URL}/logout`,
      "_self"
    );
  };

  const handleShow = () => setShow(true);

  const checkAdmin =
    currentUser?.email === "beka.lomsadze.1@btu.edu.ge" ||
    currentUser?.email === "shvangiradze22giorgi@gmail.com" ||
    currentUser?.email === "chikviladze555@gmail.com" ||
    currentUser?.email === "ubitoz133@gmail.com" ||
    currentUser?.email === "b.ejibishvili1@gmail.com";

useEffect(() => {
    // 1. Normalize the path: strip trailing slash if it exists (e.g., "/dashboard/" becomes "/dashboard")
    const currentPath = location.pathname.endsWith("/") && location.pathname !== "/"
      ? location.pathname.slice(0, -1)
      : location.pathname;

    // 2. Run a singular check against the normalized path
    if (currentPath === "/dashboard" && !checkAdmin) {
      navigate("/", { replace: true }); // 'replace: true' stops them from hitting 'back' to return to the dashboard
    }
  }, [checkAdmin, navigate, location.pathname]);

  return {
    logout,
    handleShow,
    checkAdmin,
  };
};

export default useDashboard;
