import { useEffect, useState } from "react";
import API from "../../utils/API";
import { FullUser } from "../../types/Types";

function Dashboard() {
  const [users, setUsers] = useState<FullUser[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const url = "/users";
        const res = await API.get(url);
        setUsers(res.data.users);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, []);

  const handleActive = async (userId: string, isPaid: boolean) => {
    try {
      const url = `/users/${userId}`;
      await API.put(url, { isPaid: !isPaid });
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, isPaid: !isPaid } : user
        )
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="flex flex-col items-center pb-16">
      <h1 className="my-12 text-2xl font-bold">Admin Dashboard</h1>
      <table className="table-auto border-collapse border w-[70%]">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2">სახელი</th>
            <th className="px-4 py-2">გვარი</th>
            <th className="px-4 py-2">მეილი</th>
            <th className="px-4 py-2">ასაკი</th>
            <th className="px-4 py-2">ქალაქი</th>
            <th className="px-4 py-2">ტელეფონი</th>
            <th className="px-4 py-2">სტატუსი</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2 border-gray-300">
                {user.firstName}
              </td>
              <td className="border px-4 py-2 border-gray-300">
                {user.lastName}
              </td>
              <td className="border px-4 py-2 border-gray-300">{user.email}</td>
              <td className="border px-4 py-2 border-gray-300">{user.age}</td>
              <td className="border px-4 py-2 border-gray-300">{user.city}</td>
              <td className="border px-4 py-2 border-gray-300">{user.phone}</td>
              <td className="border px-4 py-2 border-gray-300 flex justify-center">
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
