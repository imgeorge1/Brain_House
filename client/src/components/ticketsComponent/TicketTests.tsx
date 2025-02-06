import Ticket from "./Ticket";
import useTicketHandler from "../../hooks/useTicketHandler/useTicketHandler";
import Pagination from "../pagination/Pagination";
import { useUserContext } from "../../context/UserContext";
import { TicketsTypes } from "../../types/Types";
import VideoRender from "./VideoRender";

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
    <section className="w-full max-w-[670px] mt-14 md:mt-40">
      {checkForVideo ? (
        <VideoRender checkForVideo={checkForVideo} />
      ) : (
        <p className="">
          ვიდეო გამოჩნდება ფასიანი პაკეტის შეძენის შემდეგ
        </p>
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
