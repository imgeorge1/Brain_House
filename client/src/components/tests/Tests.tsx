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
    <div className=" mx-auto lg:max-w-[680px] mb-40 mt-28">
      {currentTicketIndex < ticketData.length && (
        <Ticket
          key={ticketData[currentTicketIndex].id}
          data={ticketData[currentTicketIndex]}
          clickedAnswers={clickedAnswers}
          handleButtonClick={handleButtonClick}
          getAnswerClass={getAnswerClass}
        />
      )}
      {location.pathname.split("/")[1] === "exams" &&
        !start &&
        passedQuestionLength !== 30 && (
          <>
            <div className="flex justify-around ">
              <p
                className="bg-[#babfc7] p-2 rounded-md text-lg mt-8 md:mt-5 md:text-2xl font-roboto
               font-bold"
              >
                {currentTicketIndex + 1} / 30
              </p>
              <p
                className="bg-red-500 p-2 rounded-md text-lg mt-8 md:mt-5 md:text-2xl font-roboto
              font-bold"
              >
                შეცდომა: {countAnswer.incorrect}
              </p>
              <p
                className="bg-green-500 p-2 rounded-md text-lg mt-8 md:mt-5 md:text-2xl font-roboto
              font-bold"
              >
                სწორი: {countAnswer.correct}
              </p>
            </div>
          </>
        )}
      {passedQuestionLength === 30 && (
        <div className="text-center text-3xl font-semibold mb-20 mt-80 font-roboto">
          <motion.h1
            initial={{ opacity: 0, y: -200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            თქვენ გქონდათ{" "}
            <span className="text-red-500">
              {countAnswer.incorrect} შეცდომა
            </span>{" "}
            და დააგროვეთ{" "}
            <span className="text-green-500">{countAnswer.correct} სწორი</span>{" "}
            პასუხი
          </motion.h1>
          <motion.button
            initial={{ opacity: 0, rotate: 180 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
            onClick={restartTest}
            className="mt-14 p-2 bg-[#272559] text-white"
          >
            თავიდან დაწყება
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default Tests;
