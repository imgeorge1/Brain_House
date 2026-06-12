import { useEffect, useState } from "react";
import API from "../../utils/API";
import { FullUser } from "../../types/Types";

// Add { checkAdmin } as a parameter to the hook
const useDashboardPage = (checkAdmin: boolean) => {
  const [users, setUsers] = useState<FullUser[]>([]);

  useEffect(() => {
    // 🛡️ FRONTEND GATEKEEPER:
    // If they aren't an admin, STOP. Do not fetch a single byte of data from the network.
    if (!checkAdmin) return;

    const getUsers = async () => {
      try {
        const res = await API.get("/users");
        const res2 = await API.get("/usersInfo");

        const userInfoMap = res2.data.userInfoList.reduce(
          (acc: { [email: string]: FullUser }, userInfo: FullUser) => {
            acc[userInfo.email] = userInfo;
            return acc;
          },
          {}
        );

        const mergedUsers = res.data.users.map((user: FullUser) => {
          const userInfo = userInfoMap[user.email];
          const mergedUser = {
            ...(userInfo || {}),
            ...user,
          };
          if (userInfo) {
            mergedUser._id = user._id;
          }
          return mergedUser;
        });
        setUsers(mergedUsers);
      } catch (error) {
        console.error(error);
      }
    };
    
    getUsers();
  }, [checkAdmin]); // Add checkAdmin to the dependency array

  const handleActive = async (userId: string, isPaid: boolean) => {
    if (!checkAdmin) return; // Prevent non-admins from triggering this action
    try {
      const currentDate = new Date().toISOString().split("T")[0];

      await API.put(`/users/${userId}`, {
        isPaid: !isPaid,
        payDate: isPaid ? null : currentDate,
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId
            ? { ...user, isPaid: !isPaid, payDate: isPaid ? "" : currentDate }
            : user
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
