import { useContext, useEffect, useState } from "react";
import Course from "../../components/course/Course";
import { TicketsTypes } from "../../types/Types";
import TicketTests from "../../components/ticketsComponent/TicketTests";
import { useLocation } from "react-router-dom";
import API from "../../utils/API";
import { UserContext } from "../../context/UserContext";

function Courses() {
  const [ticketData, setTicketData] = useState<TicketsTypes[]>([]);
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
    currentUser ? currentUser.completed : 1
  );

  const changeCategory =
    parseInt(location.pathname.split("/")[2]) === categoryId;

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

  return (
    <main className="flex flex-col items-center lg:flex-row lg:items-start justify-evenly">
      <Course setTicketData={setTicketData} completed={completedArray} />
      <TicketTests
        ticketData={ticketData}
        setCorrectAnswer={setCorrectAnswer}
      />
    </main>
  );
}

export default Courses;
