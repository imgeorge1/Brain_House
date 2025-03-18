import { useEffect, useState } from "react";
import API from "../../utils/API";
import { FullUser } from "../../types/Types";

const useDashboardPage = () => {
  const [users, setUsers] = useState<FullUser[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await API.get("/users");
        console.log(res);

        const res2 = await API.get("/usersInfo");

        // Merge the data from both responses
        const userInfoMap = res2.data.userInfoList.reduce(
          (acc: { [email: string]: FullUser }, userInfo: FullUser) => {
            acc[userInfo.email] = userInfo;
            return acc;
          },
          {}
        );

        // Merge data from both responses while ensuring _id from res remains intact
        const mergedUsers = res.data.users.map((user: FullUser) => {
          const userInfo = userInfoMap[user.email];
          const mergedUser = {
            ...(userInfo || {}), // Merge userInfo if available
            ...user, // Merge user data
          };
          if (userInfo) {
            mergedUser._id = user._id; // Keep the _id from the first response
          }
          return mergedUser;
        });
        setUsers(mergedUsers);
        console.log(mergedUsers);
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
