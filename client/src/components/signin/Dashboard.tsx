import { Link, useLocation, useNavigate } from "react-router-dom";
import { DashboardTypes } from "../../types/Types";
import { useEffect } from "react";

const Dashboard = ({ currentUser, setShow }: DashboardTypes) => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    window.open("https://brain-house-vkk7.onrender.com/logout", "_self");
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
  }, []);

  return (
    <div>
      {currentUser ? (
        <div className=" gap-4 flex justify-end p-2">
          {checkAdmin && (
            <Link
              to="dashboard"
              className="bg-green-500 p-2 rounded-2xl text-xl font-bold text-white"
              style={{ textDecoration: "none" }}
            >
              Dashboard
            </Link>
          )}

          <h4 className="mt-2 text-xl">
            {currentUser.firstName + " " + currentUser.lastName}
          </h4>
          <button
            className="buttonBorder px-6 py-2 rounded-3xl hover:bg-orange-500 text-xl text-white"
            onClick={logout}
          >
            გამოსვლა
          </button>
        </div>
      ) : (
        <button
          className="buttonBorder px-6 py-2 rounded-3xl hover:bg-orange-500 text-xl text-white"
          onClick={handleShow}
        >
          შესვლა
        </button>
      )}
    </div>
  );
};

export default Dashboard;
