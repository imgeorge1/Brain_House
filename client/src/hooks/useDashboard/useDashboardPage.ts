import { useEffect, useState } from "react";
import API from "../../utils/API";
import { FullUser } from "../../types/Types";

const useDashboardPage = () => {
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

  return {
    users,
    handleActive,
  };
};

export default useDashboardPage;
