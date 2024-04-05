import React, { useEffect, useState } from "react";
import Ticket from "./Ticket";
import useTicketHandler from "../../hooks/useTicketHandler/useTicketHandler";
import Pagination from "../pagination/Pagination";
import { useUserContext } from "../../context/UserContext";
import { TicketsTypes } from "../../types/Types";
import useTicketRoutes from "../../hooks/useTicketRoutes/useTicketRoutes";

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

  const { categoryData } = useTicketRoutes();
  const { ticketData } = useUserContext();
  const [currentCategoryVideo, setCurrentCategoryVideo] = useState<
    string | null
  >(null);

  // Determine current category ID
  useEffect(() => {
    const categoryId =
      currentTicket.length > 0 ? currentTicket[0].categoryID : null;
    if (categoryId) {
      const category = categoryData.find((cat) => cat.id === categoryId);
      console.log("category", category);
      if (category && category?.videoURL) {
        setCurrentCategoryVideo(category.videoURL);
        console.log("currentCategoryVideo", currentCategoryVideo);
      } else {
        setCurrentCategoryVideo(null); // No video available for current category
        console.log("currentCategoryVideo", currentCategoryVideo);
      }
    }
  }, [currentTicket, categoryData]);

  const checkForVideo =
    currentPage === 1 && location.pathname.startsWith("/courses");

  return (
    <section className="w-full max-w-[690px] mt-40  border-4 border-green-700">
      {currentCategoryVideo && (
        <iframe
          key={`video-${currentCategoryVideo}`} // Use a unique key for each iframe
          title={`Video ${currentTicket[0]?.id}`} // Updated line
          src={currentCategoryVideo}
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
