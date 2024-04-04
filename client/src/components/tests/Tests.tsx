import useTicketHandler from "../../hooks/useTicketHandler/useTicketHandler";
import Ticket from "../ticketsComponent/Ticket";
import { useUserContext } from "../../context/UserContext";

const Tests = () => {
  const { clickedAnswers, handleButtonClick, getAnswerClass } =
    useTicketHandler();
  const { ticketData } = useUserContext();

  return (
    <div className="mt-28">
      {ticketData.map((data) => (
        <Ticket
          key={data.id}
          data={data}
          clickedAnswers={clickedAnswers}
          handleButtonClick={handleButtonClick}
          getAnswerClass={getAnswerClass}
        />
      ))}
    </div>
  );
};

export default Tests;
