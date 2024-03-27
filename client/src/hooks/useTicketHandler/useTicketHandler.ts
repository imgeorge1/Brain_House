import { useState, useEffect } from "react";
import { ClickedAnswers } from "../../types/Types";
import { useLocation } from "react-router-dom";
import useTicketRoutes from "../useTicketRoutes/useTicketRoutes";

const useTicketHandler = (
  setCorrectAnswer?: React.Dispatch<React.SetStateAction<number>>
) => {
  const { ticketData } = useTicketRoutes();
  const [clickedAnswers, setClickedAnswers] = useState<ClickedAnswers>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [completed, setCompleted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setCurrentPage(1);
    setClickedAnswers({});
    setCorrectAnswer && setCorrectAnswer(0);
  }, [location.pathname]);

  const handleButtonClick = (dataId: number, selectedAnswer: number) => {
    if (clickedAnswers[dataId] !== undefined) {
      return;
    }

    setClickedAnswers({
      ...clickedAnswers,
      [dataId]: selectedAnswer,
    });

    if (location.pathname.startsWith("/courses")) {
      const correctAnswer = ticketData.find(
        (item) => item.id === dataId
      )?.correctAnswer;

      if (correctAnswer !== undefined && selectedAnswer === correctAnswer) {
        if (setCorrectAnswer) {
          setCorrectAnswer((prevCorrectNumber) => prevCorrectNumber + 1);
        }
      }
    }
  };

  const getAnswerClass = (dataId: number, answerIndex: number) => {
    const clickedAnswer = clickedAnswers[dataId];
    if (clickedAnswer !== undefined) {
      return answerIndex ===
        ticketData.find((item) => item.id === dataId)?.correctAnswer
        ? "bg-green-500"
        : clickedAnswer === answerIndex
        ? "bg-red-500"
        : "bg-gray-400";
    }
    return "bg-gray-400";
  };

  const ticketsPerPage = 15;
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTicket = ticketData.slice(indexOfFirstTicket, indexOfLastTicket);

  return {
    currentPage,
    completed,
    currentTicket,
    clickedAnswers,
    handleButtonClick,
    getAnswerClass,
    setCompleted,
    setCurrentPage,
    ticketData,
  };
};

export default useTicketHandler;
