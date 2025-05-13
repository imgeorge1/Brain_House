import { useState } from "react";
import useDashboardPage from "../../hooks/useDashboard/useDashboardPage";
import OldDashboard from "../../components/olddata";

function Dashboard() {
  const { users, handleActive } = useDashboardPage();

  const [oldData, setOldData] = useState<boolean>(false);

  const handleOldData = () => {
    setOldData(true);
  };
  const handleNewData = () => {
    setOldData(false);
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
          className="px-3 py-2 bg-green-700 rounded-lg focus:outline-none  focus:border-b-4 focus:border-[#2d2862]"
        >
          Old Data
        </button>
      </div>
      {oldData === false ? (
        <table className="table-auto border-collapse border w-[70%]">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2"> სახელი გვარი</th>
              <th className="px-4 py-2">სახელი (მეილის)</th>
              <th className="px-4 py-2">გვარი (მეილის)</th>
              <th className="px-4 py-2">მეილი</th>
              <th className="px-4 py-2">ასაკი</th>
              <th className="px-4 py-2">ქალაქი</th>
              <th className="px-4 py-2">ტელეფონი</th>
              <th className="px-4 py-2">გადახდის თარიღი</th>
              <th className="px-4 py-2">სტატუსი</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2 border-gray-300">
                  {user.fullName}
                </td>
                <td className="border px-4 py-2 border-gray-300">
                  {user.firstName}
                </td>
                <td className="border px-4 py-2 border-gray-300">
                  {user.lastName}
                </td>
                <td className="border px-4 py-2 border-gray-300">
                  {user.email}
                </td>
                <td className="border px-4 py-2 border-gray-300">{user.age}</td>
                <td className="border px-4 py-2 border-gray-300">
                  {user.city}
                </td>
                <td className="border px-4 py-2 border-gray-300">
                  {user.phone}
                </td>
                <td className="border px-4 py-2 border-gray-300">
                  {user.payDate}
                </td>
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
      ) : (
        <OldDashboard />
      )}
    </div>
  );
}

export default Dashboard;
