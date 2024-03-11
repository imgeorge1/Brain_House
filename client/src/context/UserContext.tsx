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
  const [currentUser, setCurrentUser] = useState(null);

  const getUser = async () => {
    try {
      // Get JWT token from local storage
      const jwtToken = localStorage.getItem('jwtToken');
      console.log('jwtToken', jwtToken);

      if (jwtToken) {
        // Include token in request headers
        const response = await API.get('/user', {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setCurrentUser(response.data);
      } else {
        console.log('JWT token not found in local storage');
      }
    } catch (error) {
      console.log('Error fetching user:', error);
    }
  };

  useEffect(() => {
    // Check if JWT token exists
    const jwtToken = new URLSearchParams(window.location.search).get(
      'jwtToken'
    );
    if (jwtToken) {
      // Store JWT token in local storage or session storage
      localStorage.setItem('jwtToken', jwtToken);
      // Remove JWT token from URL
      window.history.replaceState({}, document.title, '/');
    }

    // Fetch current user information if JWT token exists
    if (!currentUser && jwtToken) {
      getUser();
    }
  }, [currentUser]);

  console.log(currentUser);

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
