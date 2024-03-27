import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../../utils/API";
import { UserContext } from "../../context/UserContext";
import useTicketRoutes from "../useTicketRoutes/useTicketRoutes";

const useCourses = () => {
  const { setTicketData, ticketData } = useTicketRoutes();
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const location = useLocation();
  const { currentUser } = useContext(UserContext);
  const [completed, setCompleted] = useState<number>(() => {
    const localCompleted = localStorage.getItem("completed");
    return localCompleted
      ? parseInt(localCompleted)
      : currentUser?.completed || 1;
  });

  const [categoryId, setCategoryId] = useState(
    currentUser ? currentUser.completed : completed
  );

  const categoryIndex = location.state ? parseInt(location.state) : 1;

  const changeCategory = categoryIndex === categoryId;

  useEffect(() => {
    if (correctAnswer > 2 && changeCategory) {
      setCompleted((prevCompleted) => prevCompleted + 1);
    }
  }, [correctAnswer]);

  useEffect(() => {
    const updated = {
      email: currentUser?.email,
      completed: completed,
    };
    const allowNextCategory = async () => {
      try {
        await API.put("/user", updated, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (correctAnswer > 2 && changeCategory) {
      allowNextCategory();
      setCategoryId(completed);
      localStorage.setItem("completed", completed.toString());
    }
  }, [completed]);

  const completedArray = Array.from(Array(completed), (_, index) => index + 1);

  return {
    ticketData,
    setTicketData,
    correctAnswer,
    setCorrectAnswer,
    completed,
    completedArray,
  };
};

export default useCourses;
