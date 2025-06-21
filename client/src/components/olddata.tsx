import { useEffect, useState } from "react";
import API from "../utils/API";
import { MergedUser } from "../types/Types";

function OldDashboard() {
  const [users, setUsers] = useState<MergedUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await API.get("/oldusers");
        console.log(response);

        setUsers(response.data.mergedUsers);
      } catch (err) {
        console.log("Error fetching merged users:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
 <div className="w-full overflow-x-auto px-2">
        <table className="min-w-[800px] table-auto border-collapse border m-auto">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2">სახელი გვარი</th>
            <th className="px-4 py-2">სახელი (მეილის)</th>
            <th className="px-4 py-2">გვარი (მეილის)</th>
            <th className="px-4 py-2">მეილი</th>
            <th className="px-4 py-2">ასაკი</th>
            <th className="px-4 py-2">ქალაქი</th>
            <th className="px-4 py-2">ტელეფონი</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.fullName}</td>
              <td className="border px-4 py-2">{user.firstName}</td>
              <td className="border px-4 py-2">{user.lastName}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.age || "-"}</td>
              <td className="border px-4 py-2">{user.city || "-"}</td>
              <td className="border px-4 py-2">{user.phone || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OldDashboard;
