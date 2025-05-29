import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
  useLayoutEffect,
} from "react";
import { useLocation } from "react-router-dom";
import API from "../utils/API";
import { TicketsTypes, User } from "../types/Types";
import { useNavigate } from "react-router-dom";

interface UserContextType {
  currentUser: User | null;
  booleanPaid: boolean;
  setTicketData: React.Dispatch<React.SetStateAction<TicketsTypes[]>>;
  ticketData: TicketsTypes[];
  setCorrectAnswer: React.Dispatch<React.SetStateAction<number>>;
  correctAnswer: number;
}

const UserContext = createContext<UserContextType>({
  currentUser: null,
  booleanPaid: false,
  setTicketData: () => {},
  ticketData: [],
  setCorrectAnswer: () => {},
  correctAnswer: 0,
});

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const location = useLocation();
  const [ticketData, setTicketData] = useState<TicketsTypes[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  const navigate = useNavigate();
  const booleanPaid = localStorage.getItem("paid") === "true";

  console.log(currentUser);

  const getUser = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.log("❌ No token found");
      return;
    }

    try {
      const response = await API.get<User>("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("✅ User response:", response.data);
      setCurrentUser(response.data);

      if (response.data) {
        localStorage.setItem("paid", response.data.isPaid.toString());
        navigate("/");
      }
    } catch (error) {
      console.error("❌ Error fetching user:", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("verifyToken");
      localStorage.removeItem("paid");
    }
  };
  useLayoutEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      getUser();
    } else {
      console.log("❌ No token found in localStorage");
      localStorage.removeItem("paid"); // Optional: cleanup
    }
  }, []);

  useEffect(() => {
    if (!location.pathname.startsWith("/tickets")) setTicketData([]);
    setCorrectAnswer(0);
  }, [location.pathname]);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        booleanPaid,
        setTicketData,
        ticketData,
        setCorrectAnswer,
        correctAnswer,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { UserProvider, useUserContext };
