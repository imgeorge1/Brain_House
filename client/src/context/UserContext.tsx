import React, { createContext, useState, useEffect, ReactNode } from 'react';
import PropTypes from 'prop-types'; // Import prop types
import { useParams } from 'react-router-dom'; // Import useParams
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
  const { token } = useParams(); // Extract token from URL

  const getUser = async () => {
    try {
      const response = await API.get<{ user: FullUser }>(
        `/login/success/${token}`,
        {
          withCredentials: true,
        }
      );

      setCurrentUser(response.data.user);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (token && !currentUser) {
      getUser();
    }
  }, [token, currentUser]);

  console.log('token', token);
  console.log('currentUser', currentUser);

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
