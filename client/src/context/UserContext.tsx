import React, { createContext, useState, useEffect, ReactNode } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
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
  const [currentUser, setCurrentUser] = useState<{ user: FullUser } | null>(
    null
  );
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("jwtToken");

  const getUser = async () => {
    try {
      const response = await API.get<{ user: FullUser }>(`/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response", response);
      setCurrentUser(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (token && !currentUser) {
      getUser();
    }
  }, [token, currentUser]);

  console.log("token", token);
  console.log("currentUser", currentUser);

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
