import React, { createContext, useState, useEffect, ReactNode } from "react";
import PropTypes from "prop-types"; // Import prop types
import API from "../utils/API";
import { FullUser } from "../types/Types";

interface UserContextType {
  currentUser: FullUser | null;
}

const UserContext = createContext<UserContextType>({
  currentUser: null,
});

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FullUser | null>(null);
  console.log("TCL: UserProvider -> currentUser", currentUser);

  const getUser = async () => {
    try {
      const response = await API.get<{ user: FullUser }>("/login/success", {
        withCredentials: true,
      });

      setCurrentUser(response.data.user);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      getUser();
    }
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserProvider, UserContext };
