import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useDashboardPage from "../../hooks/useDashboard/useDashboardPage";
import OldDashboard from "../../components/olddata";
import API from "../../utils/API";
import { EditableUser, User } from "../../types/Types";

type AddCity = {
  email: string;
  city: string;
};

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("accessToken");
  const parsedUser = token ? parseJwt(token) : null;
  const checkAdmin = parsedUser?.email === 
    currentUser?.email === "beka.lomsadze.1@btu.edu.ge" ||
    currentUser?.email === "shvangiradze22giorgi@gmail.com" ||
    currentUser?.email === "chikviladze555@gmail.com" ||
    currentUser?.email === "ubitoz133@gmail.com" ||
    currentUser?.email === "b.ejibishvili1@gmail.com";

  const [isVerifying, setIsVerifying] = useState<boolean>(true);
  const { users, handleActive } = useDashboardPage();

  useEffect(() => {
    const currentPath = location.pathname.endsWith("/") && location.pathname !== "/"
      ? location.pathname.slice(0, -1)
      : location.pathname;

    if (currentPath === "/dashboard" && !checkAdmin) {
      navigate("/", { replace: true });
    }

    const timer = setTimeout(() => {
      setIsVerifying(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [checkAdmin, navigate, location.pathname]);

  const logout = () => {
    localStorage.removeItem("paid");
    localStorage.removeItem("accessToken");
    window.open(`${import.meta.env.VITE_SERVER_URL}/logout`, "_self");
  };

  const [oldData, setOldData] = useState<boolean>(false);
  const [addCity, setAddCity] = useState<AddCity>({ email: "", city: "" });

  const [editUser, setEditUser] = useState<EditableUser>({
    firstName: "",
    lastName: "",
    email: "",
    age: null,
    city: "",
    phone: "",
  });
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogAddCityRef = useRef<HTMLDialogElement>(null);

  const handleOldData = () => setOldData(true);
  const handleNewData = () => setOldData(false);

  const openEditDialog = (user: User) => {
    setEditUser({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      age: user.age || null,
      city: user.city || "",
      phone: user.phone || "",
      payDate: user.payDate || "",
    });
    dialogRef.current?.showModal();
  };
  const openAddCityDialog = (user: User) => {
    console.log(user);

    setAddCity({ email: user.email, city: "" });
    dialogAddCityRef.current?.showModal();
  };
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditUser((prev: EditableUser) => ({ ...prev, [name]: value }));
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCity = e.target.value;

    setAddCity((prev: AddCity) => ({
      ...prev,
      city: newCity,
    }));
  };

  const saveEdit = async () => {
    try {
      console.log("userdataaa", editUser);

      const res = await API.put("/edituser", { editUser });

      console.log("res: ", res);
    } catch (error) {
      console.log(error);
    }
    dialogRef.current?.close();
  };

  const saveCity = async () => {
    try {
      const res = await API.put("/add_city", { addCity });

      console.log("res: ", res);
    } catch (error) {
      console.log(error);
    }
    dialogAddCityRef.current?.close();
  };

  const handleSendCode = async (user: User) => {
    try {
      const res = await API.post("/send_code", { user });
      console.log("Code sent:", res.data);
    } catch (error) {
      console.error("Error sending code:", error);
    }
  };

  if (isVerifying) {
    return <div className="min-h-screen bg-transparent"></div>;
  }

  if (!checkAdmin) {
    return null;
  }

  return (
    <div className="mt-32 flex flex-col items-center pb-16">
      <div className="flex gap-8 mb-5">
        <button
          onClick={handleNewData}
          className="px-3 py-2 bg-green-700 rounded-lg focus:outline-none focus:border-b-4 focus:border-[#2d2862]"
        >
          New Data
        </button>
        <button
          onClick={handleOldData}
          className="px-3 py-2 bg-green-700 rounded-lg focus:outline-none focus:border-b-4 focus:border-[#2d2862]"
        >
          Old Data
        </button>
        <button
          onClick={logout}
          className="px-3 py-2 bg-red-700 text-white rounded-lg focus:outline-none"
        >
          Log Out
        </button>
      </div>

      {!oldData ? (
      <div className="w-full overflow-x-auto px-2">
        <table className="min-w-[800px] table-auto border-collapse border">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">სახელი გვარი</th>
              <th className="px-4 py-2">სახელი (მეილის)</th>
              <th className="px-4 py-2">გვარი (მეილის)</th>
              <th className="px-4 py-2">მეილი</th>
              <th className="px-4 py-2">ასაკი</th>
              <th className="px-4 py-2">ქალაქი</th>
              <th className="px-4 py-2">ტელეფონი</th>
              <th className="px-4 py-2">გადახდის თარიღი</th>
              <th className="px-4 py-2">სტატუსი</th>
              <th className="px-4 py-2">რედაქტირება</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user.fullName}</td>
                <td className="border px-4 py-2">{user.firstName}</td>
                <td className="border px-4 py-2">{user.lastName}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.age}</td>
                <td className="border px-4 py-2">{user.city}</td>
                <td className="border px-4 py-2">{user.phone}</td>
                <td className="border px-4 py-2">{user.payDate}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleActive(user._id, user.isPaid)}
                    className={
                      user.isPaid
                        ? "bg-green-500 px-4 py-2 rounded-lg"
                        : "bg-red-500 px-4 py-2 rounded-lg"
                    }
                  >
                    {user.isPaid ? "აქტიური" : "პასიური"}
                  </button>
                </td>
                <td className="flex gap-1 border px-4 py-2">
                  <button
                    onClick={() => openEditDialog(user)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openAddCityDialog(user)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => handleSendCode(user)}
                    className="bg-yellow-800 text-white px-3 py-1 rounded-lg"
                  >
                    Send Code
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      ) : (
        <OldDashboard />
      )}
      <dialog
        ref={dialogAddCityRef}
        className=" top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl p-6 shadow-md backdrop:bg-black/50"
      >
        <form method="dialog" className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Add City</h2>
          <input
            name="lastName"
            value={addCity.city}
            required
            onChange={handleCityChange}
            placeholder="City"
            className="border p-2 rounded"
          />
          <div className="flex gap-4 justify-between">
            <button
              type="submit"
              onClick={saveCity}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => dialogAddCityRef.current?.close()}
              className="bg-gray-400 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
      <dialog
        ref={dialogRef}
        className=" top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl p-6 shadow-md backdrop:bg-black/50"
      >
        {editUser && (
          <form method="dialog" className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">Edit User</h2>
            <input
              name="firstName"
              value={editUser.firstName}
              onChange={handleEditChange}
              placeholder="Full Name"
              className="border p-2 rounded"
            />
            <input
              name="lastName"
              value={editUser.lastName}
              onChange={handleEditChange}
              placeholder="Full Name"
              className="border p-2 rounded"
            />
            <input
              name="email"
              value={editUser.email}
              onChange={handleEditChange}
              placeholder="Email"
              className="border p-2 rounded"
            />
            <input
              name="age"
              value={editUser.age ?? ""}
              onChange={handleEditChange}
              placeholder="Age"
              className="border p-2 rounded"
            />
            <input
              name="city"
              value={editUser.city}
              onChange={handleEditChange}
              placeholder="City"
              className="border p-2 rounded"
            />
            <input
              name="phone"
              value={editUser.phone}
              onChange={handleEditChange}
              placeholder="Phone"
              className="border p-2 rounded"
            />
            <input
              name="payDate"
              type="date"
              value={editUser.payDate ?? ""}
              onChange={handleEditChange}
              className="border p-2 rounded"
            />

            <div className="flex gap-4 justify-end">
              <button
                type="submit"
                onClick={saveEdit}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="bg-gray-400 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </dialog>
    </div>
  );
}

export default Dashboard;
