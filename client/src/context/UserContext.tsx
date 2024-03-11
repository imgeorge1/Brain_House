import React, { createContext, useState, useEffect, ReactNode } from 'react';
import PropTypes from 'prop-types'; // Import prop types
import API from '../utils/API';
import { FullUser } from '../types/Types';

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
  console.log('TCL: UserProvider -> currentUser', currentUser);

  const getUser = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming you have stored the token in localStorage

      if (!token) {
        // Handle case when token is not available
        console.log('Token not found.');
        return;
      }

      const response = await API.get<{ user: FullUser }>('/login/success', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      setCurrentUser(response.data.user);
    } catch (error) {
      console.log('Error:', error);
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
