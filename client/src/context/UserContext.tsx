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
  // const queryParams = new URLSearchParams(location.search);
  const [ticketData, setTicketData] = useState<TicketsTypes[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  // const token = queryParams.get("jwtToken");

  // if (token) {
  //   localStorage.setItem("token", token);
  // }

  // const tokenFromLocalStorage = localStorage.getItem("token");
  const getUser = async () => {
    try {
      const response = await API.get<User>("/user");
      console.log("resoinse", response.data);

      if (response.data) {
        setCurrentUser(response.data);
        localStorage.setItem("paid", response.data.isPaid.toString());
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useLayoutEffect(() => {
    const getSession = async () => {
      try {
        const res = await API.get("/auth/session");

        if (res.data?.user) {
          getUser();
        } else {
          console.log("❌ Not signed in");
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    getSession();
  }, []);

  const booleanPaid = localStorage.getItem("paid") === "true";

  // useEffect(() => {
  //   if (tokenFromLocalStorage) {
  //     getUser();
  //   }
  // }, []);

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
