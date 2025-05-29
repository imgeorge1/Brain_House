import { Link } from "react-router-dom";
import { DashboardTypes } from "../../types/Types";
import useDashboard from "../../hooks/useDashboard/useDashboard";

const Dashboard = ({ currentUser, setShow }: DashboardTypes) => {
  const { logout, handleShow, checkAdmin } = useDashboard({
    currentUser,
    setShow,
  });

  return (
    <div>
      {currentUser ? (
        <div className="px-1 gap-2 justify-end sign-in-parent">
          {checkAdmin && (
            <Link
              to="dashboard"
              className="ctrlbtn bg-green-500 p-2 rounded-2xl text-xl font-bold text-white"
              style={{ textDecoration: "none" }}
            >
              Dashboard
            </Link>
          )}

          <h4 className="ctrlbtn mt-auto mb-auto users-name">
            {currentUser.firstName || ""}
          </h4>
          <button
            className="sign-out ctrlbtn buttonBorder px-6 py-2 rounded-3xl duration-200 hover:bg-orange-500 text-xl text-white"
            onClick={logout}
          >
            გამოსვლა
          </button>
        </div>
      ) : (
        <Link
          to={"/login"}
          className="sign-out ctrlbtn buttonBorder px-6 py-2 w-full rounded-3xl duration-200 hover:bg-orange-500 text-xl text-white"
          onClick={handleShow}
        >
          შესვლა
        </Link>
      )}
    </div>
  );
};

export default Dashboard;
