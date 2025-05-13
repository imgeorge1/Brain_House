import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { DashboardTypes } from "../../types/Types";

const useDashboard = ({ currentUser, setShow }: DashboardTypes) => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("paid");
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
