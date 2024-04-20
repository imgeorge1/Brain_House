import { useState, useEffect } from "react";
import { Category, ClickedAnswers } from "../../types/Types";
import { useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import categoryData from "../../data/categoryData";

const useTicketHandler = () => {
  const { ticketData, booleanPaid, setTicketData, currentUser } =
    useUserContext();
  const [clickedAnswers, setClickedAnswers] = useState<ClickedAnswers>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [countAnswer, setCountAnswer] = useState({ correct: 0, incorrect: 0 });
  const location = useLocation();
  const passedQuestionLength = Object.keys(clickedAnswers).length;

  useEffect(() => {
    if (passedQuestionLength === 30) {
      setTicketData([]);
    }
  }, [passedQuestionLength]);

  const restartClicks = () => {
    setClickedAnswers({});
    setCountAnswer({ correct: 0, incorrect: 0 });
  };

  useEffect(() => {
    setCurrentPage(1);
    setClickedAnswers({});
  }, [location.pathname]);

  const checkForVideoFunc = () => {
    const categoryId = location.pathname.split("/")[2];
    const checkForVideo =
      currentPage === 1 && location.pathname.startsWith("/tickets");

    const currentVideo = categoryData.reduce(
      (foundCategory: Category | null, category: Category) => {
        if (foundCategory) return foundCategory; // If category is already found, return it
        return category.id === parseInt(categoryId) ? category : null;
      },
      null
    );

    return checkForVideo && booleanPaid && currentUser && currentVideo;
  };

  const ticketDataMap = new Map(ticketData.map((item) => [item.id, item]));

  const handleButtonClick = (dataId: number, selectedAnswer: number) => {
    if (clickedAnswers[dataId] !== undefined) {
      return;
    }

    const correctAnswer = ticketDataMap.get(dataId)?.correctAnswer;

    setClickedAnswers({
      ...clickedAnswers,
      [dataId]: selectedAnswer,
    });

    if (correctAnswer !== undefined && location.pathname.startsWith("/exams")) {
      setCountAnswer((prevNumber) => ({
        ...prevNumber,
        [selectedAnswer === correctAnswer ? "correct" : "incorrect"]:
          prevNumber[
            selectedAnswer === correctAnswer ? "correct" : "incorrect"
          ] + 1,
      }));
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
    currentTicket,
    clickedAnswers,
    handleButtonClick,
    getAnswerClass,
    setCurrentPage,
    countAnswer,
    passedQuestionLength,
    restartClicks,
    checkForVideoFunc,
  };
};

export default useTicketHandler;
