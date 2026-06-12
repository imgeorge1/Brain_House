// src/pages/Dashboard.tsx
import { useState, useRef } from "react";
import useDashboardPage from "../../hooks/useDashboard/useDashboardPage";
import useDashboard from "../../hooks/useDashboard/useDashboard"; // Your slash & admin validation hook
import OldDashboard from "../../components/olddata";
import API from "../../utils/API";
import { EditableUser, User, DashboardTypes } from "../../types/Types";

type AddCity = {
  email: string;
  city: string;
};
function Dashboard({ currentUser, setShow }: DashboardTypes) {
  // 1. First, check if they are an admin and resolve trailing slashes
  const { logout, handleShow, checkAdmin } = useDashboard({ currentUser, setShow });

  // 2. Pass 'checkAdmin' into your data-fetching hook so it knows whether to block API calls
  const { users, handleActive } = useDashboardPage(checkAdmin);

  // 🛡️ 3. If they aren't an admin, render absolute emptiness.
  // Between this line and the API block above, DevTools will see 0 data and 0 network requests.
  if (!checkAdmin) {
    return null;
  }

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
    setAddCity({ email: user.email, city: "" });
    dialogAddCityRef.current?.showModal();
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditUser((prev: EditableUser) => ({ ...prev, [name]: value }));
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCity = e.target.value;
    setAddCity((prev) => ({ ...prev, city: newCity }));
  };

  const saveEdit = async () => {
    try {
      await API.put("/edituser", { editUser });
    } catch (error) {
      console.log(error);
    }
    dialogRef.current?.close();
  };

  const saveCity = async () => {
    try {
      await API.put("/add_city", { addCity });
    } catch (error) {
      console.log(error);
    }
    dialogAddCityRef.current?.close();
  };

  const handleSendCode = async (user: User) => {
    try {
      await API.post("/send_code", { user });
    } catch (error) {
      console.error("Error sending code:", error);
    }
  };

  return (
    <div className="mt-32 flex flex-col items-center pb-16">
      <div className="flex gap-8 mb-5">
        <button onClick={handleNewData} className="px-3 py-2 bg-green-700 rounded-lg">New Data</button>
        <button onClick={handleOldData} className="px-3 py-2 bg-green-700 rounded-lg">Old Data</button>
        <button onClick={logout} className="px-3 py-2 bg-red-700 text-white rounded-lg">Log Out</button>
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
                      className={user.isPaid ? "bg-green-500 px-4 py-2 rounded-lg" : "bg-red-500 px-4 py-2 rounded-lg"}
                    >
                      {user.isPaid ? "აქტიური" : "პასიური"}
                    </button>
                  </td>
                  <td className="flex gap-1 border px-4 py-2">
                    <button onClick={() => openEditDialog(user)} className="bg-blue-500 text-white px-3 py-1 rounded-lg">Edit</button>
                    <button onClick={() => openAddCityDialog(user)} className="bg-blue-500 text-white px-3 py-1 rounded-lg">Add</button>
                    <button onClick={() => handleSendCode(user)} className="bg-yellow-800 text-white px-3 py-1 rounded-lg">Send Code</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <OldDashboard />
      )}

      {/* Dialog Modals remain down here... */}
    </div>
  );
}

export default Dashboard;
