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
    const token = localStorage.getItem("auth_token");

    try {
      const response = await API.get<User>("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("resoinse", response.data);
      setCurrentUser(response.data);
      if (!response.data.city) {
        navigate("/");
      } else if (response.data) {
        localStorage.setItem("paid", response.data.isPaid.toString());
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useLayoutEffect(() => {
    // Grab token from URL if it exists
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");

    if (token) {
      // Save token in localStorage
      localStorage.setItem("auth_token", token);

      // Remove token from URL (optional, for cleaner URL)
      url.searchParams.delete("token");
      window.history.replaceState({}, document.title, url.pathname);
    }

    const getSession = async () => {
      try {
        const res = await API.get("/auth/session");

        if (res.data?.user) {
          getUser();
        } else {
          window.localStorage.removeItem("paid");
          window.localStorage.removeItem("auth_token");
          console.log("❌ Not signed in");
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    getSession();
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
