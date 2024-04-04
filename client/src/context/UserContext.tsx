import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { useLocation } from "react-router-dom";
import API from "../utils/API";
import { TicketsTypes, User } from "../types/Types";

interface UserContextType {
  currentUser: User | null;
  booleanPaid: boolean;
  setTicketData: React.Dispatch<React.SetStateAction<TicketsTypes[]>>;
  ticketData: TicketsTypes[];
}

const UserContext = createContext<UserContextType>({
  currentUser: null,
  booleanPaid: false,
  setTicketData: () => {},
  ticketData: [],
});

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [ticketData, setTicketData] = useState<TicketsTypes[]>([]);

  const token = queryParams.get("jwtToken");

  if (token) {
    localStorage.setItem("token", token);
  }

  const tokenFromLocalStorage = localStorage.getItem("token");

  const getUser = async () => {
    try {
      if (tokenFromLocalStorage) {
        const response = await API.get<User>("/user", {
          headers: {
            Authorization: `Bearer ${tokenFromLocalStorage}`,
          },
        });
        console.log("response", response);
        if (response.data) {
          setCurrentUser(response.data);
          localStorage.setItem("paid", response.data.isPaid.toString());
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const booleanPaid = localStorage.getItem("paid") === "true";

  useEffect(() => {
    if (
      location.pathname.startsWith("/courses/") &&
      location.pathname !== "/courses/21"
    ) {
      window.location.href = "/courses/21"; // Redirect to /courses/1
    }

    if (location.pathname.startsWith("/courses/") && !tokenFromLocalStorage) {
      window.location.href = "/";
    }

    if (tokenFromLocalStorage) {
      getUser();
    }
  }, []); // Run this effect only once on initial render

  useEffect(() => {
    setTicketData([]);
  }, [location.pathname]);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        booleanPaid,
        setTicketData,
        ticketData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { UserProvider, useUserContext };
