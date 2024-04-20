import Ticket from "./Ticket";
import useTicketHandler from "../../hooks/useTicketHandler/useTicketHandler";
import Pagination from "../pagination/Pagination";
import { useUserContext } from "../../context/UserContext";
import { TicketsTypes } from "../../types/Types";

const TicketTests = () => {
  const {
    currentPage,
    currentTicket,
    clickedAnswers,
    handleButtonClick,
    getAnswerClass,
    setCurrentPage,
    checkForVideoFunc,
  } = useTicketHandler();
  const { ticketData } = useUserContext();
  const checkForVideo = checkForVideoFunc();

  return (
    <section className="w-full max-w-[800px] mt-40">
      {checkForVideo && (
        <iframe
          key={`video-${checkForVideo.id}`} // Use a unique key for each iframe
          title={`Video ${checkForVideo.id}`}
          src={checkForVideo?.videoUrl}
          width="100%"
          height="500px"
          style={{ marginBottom: "20px" }}
          sandbox="allow-same-origin allow-scripts"
          allowFullScreen
        />
      )}

      {currentTicket.length > 0 &&
        currentTicket.map((data: TicketsTypes) => (
          <Ticket
            key={data.id}
            data={data}
            clickedAnswers={clickedAnswers}
            handleButtonClick={handleButtonClick}
            getAnswerClass={getAnswerClass}
          />
        ))}

      <div className="mt-20">
        <Pagination
          totalTickets={ticketData.length}
          ticketsPerPage={15}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </section>
  );
};

export default TicketTests;
