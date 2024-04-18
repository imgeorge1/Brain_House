import { useEffect, useState } from "react";
import { TestTypes } from "../../types/Types";

const useTestMove = ({ clickedAnswers, ticketData }: TestTypes) => {
  const [currentTicketIndex, setCurrentTicketIndex] = useState(0);

  useEffect(() => {
    // Move to the next ticket after an answer is selected
    if (clickedAnswers[ticketData[currentTicketIndex]?.id] !== undefined) {
      const timer = setTimeout(() => {
        setCurrentTicketIndex((prevIndex) => prevIndex + 1);
      }, 1000); // Delay for 2 seconds
      return () => clearTimeout(timer);
    }
  }, [clickedAnswers, currentTicketIndex, ticketData]);

  return { currentTicketIndex, setCurrentTicketIndex };
};

export default useTestMove;
