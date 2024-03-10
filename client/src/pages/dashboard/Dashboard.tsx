import { useEffect, useState } from "react";
import API from "../../utils/API";
import { FullUser } from "../../types/Types";
// import { UserContext } from "../../context/UserContext";
// import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [users, setUsers] = useState<FullUser[]>([]);
  // const { userInfo } = useContext(UserContext);
  // const navigation = useNavigate();

  // useEffect(() => {
  //   if (!userInfo || (userInfo && userInfo.admin === false)) {
  //     navigation("/");
  //   }
  // }, [userInfo, navigation]);

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
    <div className="container">
      <h1 className="mb-4">Admin Dashboard</h1>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">სახელი</th>
            <th scope="col">გვარი</th>
            <th scope="col">მეილი</th>
            <th scope="col">ასაკი</th>
            <th scope="col">ქალაქი</th>
            <th scope="col">ტელეფონი</th>
            <th scope="col">ადმინი</th>
            <th scope="col">სტატუსი</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>{user.city}</td>
              <td>{user.phone}</td>
              <td className="flex justify-center">
                <button
                  onClick={() => handleActive(user._id, user.isPaid)}
                  className={
                    user.isPaid === true
                      ? "bg-green-500 p-2 rounded-xl w-9/12"
                      : "bg-red-500 p-2 rounded-xl w-9/12"
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
