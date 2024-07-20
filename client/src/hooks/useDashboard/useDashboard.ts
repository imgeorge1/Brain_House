import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { DashboardTypes } from "../../types/Types";

const DEV_MODE = "developer";

const useDashboard = ({ currentUser, setShow }: DashboardTypes) => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    window.open(
      // change for production
      !DEV_MODE
        ? "http://localhost:3001/logout"
        : "https://brain-house-api.onrender.com/logout",
      "_self"
    );
    localStorage.removeItem("token");
    localStorage.removeItem("paid");
  };

  const handleShow = () => setShow(true);

  const checkAdmin =
    currentUser?.email === "beka.lomsadze.1@btu.edu.ge" ||
    currentUser?.email === "chikviladze555@gmail.com" ||
    currentUser?.email === "ubitoz133@gmail.com";

  useEffect(() => {
    if (location.pathname === "/dashboard" && !checkAdmin) {
      navigate("/");
    }
  }, [checkAdmin, currentUser, navigate, location.pathname]);

  return {
    logout,
    handleShow,
    checkAdmin,
  };
};

export default useDashboard;
