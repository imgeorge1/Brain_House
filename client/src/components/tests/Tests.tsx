import useTicketHandler from "../../hooks/useTicketHandler/useTicketHandler";
import Ticket from "../ticketsComponent/Ticket";
import { useUserContext } from "../../context/UserContext";
import { motion } from "framer-motion";

const Tests = ({
  setStart,
}: {
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    clickedAnswers,
    handleButtonClick,
    getAnswerClass,
    countIncorrectAnswer,
    passedQuestionLength,
    restartClicks,
  } = useTicketHandler();
  const { ticketData } = useUserContext();

  const restartTest = () => {
    setStart(true);
    restartClicks();
  };

  return (
    <div className=" mx-auto lg:max-w-[800px] mb-40">
      {ticketData.map((data) => (
        <Ticket
          key={data.id}
          data={data}
          clickedAnswers={clickedAnswers}
          handleButtonClick={handleButtonClick}
          getAnswerClass={getAnswerClass}
        />
      ))}
      {passedQuestionLength === 30 && (
        <div className="text-center text-3xl font-semibold mb-20 mt-80">
          <motion.h1
            initial={{ opacity: 0, y: -200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            თქვენ გქონდათ {countIncorrectAnswer} შეცდომა და დააგროვეთ{" "}
            {passedQuestionLength - countIncorrectAnswer} სწორი პასუხი
          </motion.h1>
          <button onClick={restartTest} className="mt-14 bg-black text-white">
            თავიდან დაწყება
          </button>
        </div>
      )}
    </div>
  );
};

export default Tests;
