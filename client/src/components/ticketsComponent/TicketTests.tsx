import Ticket from "./Ticket";
import useTicketHandler from "../../hooks/useTicketHandler/useTicketHandler";
import Pagination from "../pagination/Pagination";
import { useUserContext } from "../../context/UserContext";
import { TicketsTypes } from "../../types/Types";

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
    checkForVideoFunc,
  } = useTicketHandler(setCorrectAnswer);
  const { ticketData } = useUserContext();

  const checkForVideo = checkForVideoFunc();

  return (
    <section className="w-full max-w-[690px] mt-40">
      {checkForVideo && (
        <iframe
          key={`video-${checkForVideo.id}`} // Use a unique key for each iframe
          title={`Video ${checkForVideo.id}`} // Updated line
          src={checkForVideo?.videoUrl}
          width="100%"
          height="500px"
          style={{ marginBottom: "20px" }}
          sandbox="allow-same-origin allow-scripts"
          allowFullScreen
        />
      )}

      {completed || location.pathname.startsWith("/tickets") ? (
        currentTicket.length > 0 &&
        currentTicket.map((data: TicketsTypes) => (
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
