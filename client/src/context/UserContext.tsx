import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import API from '../utils/API';
import { User } from '../types/Types';

interface UserContextType {
  currentUser: User | null;
  getUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  currentUser: null,
  getUser: async () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const token = queryParams.get('jwtToken');

  if (token) {
    localStorage.setItem('token', token);
  }

  const tokenFromLocalStorage = localStorage.getItem('token');

  const getUser = async () => {
    try {
      if (tokenFromLocalStorage) {
        const response = await API.get<User>('/user', {
          headers: {
            Authorization: `Bearer ${tokenFromLocalStorage}`,
          },
        });
        console.log('response', response);
        if (response.data) {
          setCurrentUser(response.data);
        }

      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (tokenFromLocalStorage) {
      getUser();
    }
  }, [currentUser?.completed]);


  return (
    <UserContext.Provider value={{ currentUser, getUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
