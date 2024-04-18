import { useState, useEffect } from "react";
import { Category, ClickedAnswers } from "../../types/Types";
import { useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import categoryData from "../../data/categoryData";

const useTicketHandler = () =>
  // setCorrectAnswer?: React.Dispatch<React.SetStateAction<number>>
  {
    const { ticketData, booleanPaid, setTicketData, currentUser } =
      useUserContext();
    const [clickedAnswers, setClickedAnswers] = useState<ClickedAnswers>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [countIncorrectAnswer, setCountIncorrectAnswer] = useState(0);
    const location = useLocation();
    const passedQuestionLength = Object.keys(clickedAnswers).length;

    useEffect(() => {
      if (passedQuestionLength === 30) {
        setTicketData([]);
      }
    }, [passedQuestionLength]);

    const restartClicks = () => {
      setClickedAnswers({});
      setCountIncorrectAnswer(0);
    };

    useEffect(() => {
      setCurrentPage(1);
      setClickedAnswers({});
      // setCorrectAnswer && setCorrectAnswer(0);
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

      if (correctAnswer !== undefined && selectedAnswer !== correctAnswer) {
        //   if (location.pathname.startsWith("/courses") && setCorrectAnswer) {
        //     setCorrectAnswer((prevCorrectNumber) => prevCorrectNumber + 1);
        //   }
        // } else {
        if (location.pathname.startsWith("/exams")) {
          setCountIncorrectAnswer((prevNumber) => prevNumber + 1);
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
    const currentTicket = ticketData.slice(
      indexOfFirstTicket,
      indexOfLastTicket
    );

    return {
      currentPage,
      currentTicket,
      clickedAnswers,
      handleButtonClick,
      getAnswerClass,
      setCurrentPage,
      countIncorrectAnswer,
      passedQuestionLength,
      restartClicks,
      checkForVideoFunc,
    };
  };

export default useTicketHandler;
