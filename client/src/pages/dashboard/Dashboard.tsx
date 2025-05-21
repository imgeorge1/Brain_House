import { useState, useRef } from "react";
import useDashboardPage from "../../hooks/useDashboard/useDashboardPage";
import OldDashboard from "../../components/olddata";
import API from "../../utils/API";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { users, handleActive } = useDashboardPage();

  const [oldData, setOldData] = useState<boolean>(false);
  const [editUser, setEditUser] = useState<any>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();

  const handleOldData = () => setOldData(true);
  const handleNewData = () => setOldData(false);

  const openEditDialog = (user: any) => {
    setEditUser({
      fullName: user.fullName || "",
      email: user.email || "",
      age: user.age || "",
      city: user.city || "",
      phone: user.phone || "",
    });
    dialogRef.current?.showModal();
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditUser((prev: any) => ({ ...prev, [name]: value }));
  };
  console.log("edited user ", editUser);

  const saveEdit = async () => {
    // Save logic goes here (e.g., API call or hook)
    try {
      console.log("userdataaa", editUser);

      const res = await API.put("/signup", { editUser });

      console.log("res: ", res);
      navigate("/payment");
    } catch (error) {
      console.log(error);
    }
    dialogRef.current?.close();
  };

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
      </div>

      {!oldData ? (
        <table className="table-auto border-collapse border w-[70%]">
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
                <td className="border px-4 py-2">
                  <button
                    onClick={() => openEditDialog(user)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <OldDashboard />
      )}

      {/* Edit Dialog */}
      <dialog
        ref={dialogRef}
        className="rounded-xl p-6 shadow-md backdrop:bg-black/50"
      >
        {editUser && (
          <form method="dialog" className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">Edit User</h2>
            <input
              name="fullName"
              value={editUser.fullName}
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
              value={editUser.age}
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
