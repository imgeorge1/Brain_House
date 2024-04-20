import useTicketHandler from "../../hooks/useTicketHandler/useTicketHandler";
import Ticket from "../ticketsComponent/Ticket";
import { useUserContext } from "../../context/UserContext";
import { motion } from "framer-motion";
import useTestMove from "../../hooks/useTestMove/useTestMove";

const Tests = ({
  setStart,
  start,
}: {
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  start: boolean;
}) => {
  const {
    clickedAnswers,
    handleButtonClick,
    getAnswerClass,
    countAnswer,
    passedQuestionLength,
    restartClicks,
  } = useTicketHandler();
  const { ticketData } = useUserContext();
  const { currentTicketIndex, setCurrentTicketIndex } = useTestMove({
    clickedAnswers,
    ticketData,
  });

  const restartTest = () => {
    setStart(true);
    restartClicks();
    setCurrentTicketIndex(0); // Reset ticket index
  };

  return (
    <div className=" mx-auto lg:max-w-[800px] mb-40 mt-28">
      {location.pathname.split("/")[1] === "exams" &&
        !start &&
        passedQuestionLength !== 30 && (
          <>
            <p className="text-3xl">{currentTicketIndex + 1} / 30</p>
            <p className="text-3xl">შეცდომა {countAnswer.incorrect}</p>
            <p className="text-3xl">სწორი {countAnswer.correct}</p>
          </>
        )}
      {currentTicketIndex < ticketData.length && (
        <Ticket
          key={ticketData[currentTicketIndex].id}
          data={ticketData[currentTicketIndex]}
          clickedAnswers={clickedAnswers}
          handleButtonClick={handleButtonClick}
          getAnswerClass={getAnswerClass}
        />
      )}
      {passedQuestionLength === 30 && (
        <div className="text-center text-3xl font-semibold mb-20 mt-80">
          <motion.h1
            initial={{ opacity: 0, y: -200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            თქვენ გქონდათ {countAnswer.incorrect} შეცდომა და დააგროვეთ{" "}
            {countAnswer.correct} სწორი პასუხი
          </motion.h1>
          <motion.button
            initial={{ opacity: 0, rotate: 180 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
            onClick={restartTest}
            className="mt-14 px-2 bg-black text-white"
          >
            თავიდან დაწყება
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default Tests;
