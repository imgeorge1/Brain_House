import { useEffect, useState } from "react";
import Pagination from "../pagination/Pagination";
import { ClickedAnswers, TicketsTypes } from "../../types/Types";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const TicketTests = ({
  ticketData,
  setCorrectAnswer,
}: {
  ticketData: TicketsTypes[];
  setCorrectAnswer?: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [clickedAnswers, setClickedAnswers] = useState<ClickedAnswers>({});
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

  const checkForVideo =
    currentPage === 1 && location.pathname.startsWith("/courses");

  return (
    <section className="w-full max-w-[690px]">
      {checkForVideo && (
        <img
          src="https://github.com/lomsadze123/audiophile-ecommerce-website/blob/master/src/assets/home/mobile/image-earphones-yx1.jpg?raw=true"
          alt="test"
          width={300}
          height={300}
        />
      )}

      {completed || location.pathname.startsWith("/tickets") ? (
        currentTicket.length > 0 &&
        currentTicket.map((data) => (
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="flex flex-col bg-[#230751] items-center mt-16 rounded-lg"
            key={data.id}
          >
            <div className="w-full md:w-[690px] md:h-[680px]">
              <img
                loading="lazy"
                src={data.image}
                alt="drive ticket image"
                className="w-full h-full rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src =
                    "https://via.placeholder.com/500x300.png?text=Image+Not+Available";
                }}
              />
            </div>
            <div className="flex gap-3 py-3">
              {Array.from(
                { length: data.quantityAnswer },
                (_, index) => index + 1
              ).map((item) => (
                <button
                  className={`p-5 text-2xl font-bold rounded-md ${
                    clickedAnswers[data.id] !== undefined
                      ? ""
                      : "lg:hover:bg-blue-400"
                  } lg:transition-all ${getAnswerClass(data.id, item)}`}
                  key={item}
                  onClick={() => handleButtonClick(data.id, item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        ))
      ) : (
        <button
          className="bg-black text-white mt-2 p-2"
          onClick={() => setCompleted(true)}
        >
          COMPLETED
        </button>
      )}
      {(completed || location.pathname.startsWith("/tickets")) && (
        <div className="mt-20">
          <Pagination
            totalTickets={ticketData.length}
            ticketsPerPage={ticketsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      )}
    </section>
  );
};

export default TicketTests;
