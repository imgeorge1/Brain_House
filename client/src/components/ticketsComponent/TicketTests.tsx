import Ticket from "./Ticket";
import useTicketHandler from "../../hooks/useTicketHandler/useTicketHandler";
import Pagination from "../pagination/Pagination";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const TicketTests = ({
  setCorrectAnswer,
}: {
  setCorrectAnswer?: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const {
    currentPage,
    completed,
    currentTicket,
    clickedAnswers,
    handleButtonClick,
    getAnswerClass,
    setCompleted,
    setCurrentPage,
  } = useTicketHandler(setCorrectAnswer);
  const { ticketData } = useContext(UserContext);

  const checkForVideo =
    currentPage === 1 && location.pathname.startsWith("/courses");

  return (
    <section className="w-full max-w-[690px] mt-40">
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
          <Ticket
            key={data.id}
            data={data}
            clickedAnswers={clickedAnswers}
            handleButtonClick={handleButtonClick}
            getAnswerClass={getAnswerClass}
          />
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
            ticketsPerPage={15}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      )}
    </section>
  );
};

export default TicketTests;
