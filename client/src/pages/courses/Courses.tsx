import { useState } from "react";
import Course from "../../components/course/Course";
import { TicketsTypes } from "../../types/Types";
import TicketTests from "../../components/ticketsComponent/TicketTests";

function Courses() {
  const [ticketData, setTicketData] = useState<TicketsTypes[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  // console.log(correctAnswer);
  const disabled = [1];

  if (correctAnswer > ticketData.length * 0.1) {
    disabled.push(disabled[disabled.length - 1] + 1);
  }

  return (
    <main className="flex flex-col lg:flex-row items-center lg:items-start justify-evenly">
      <Course setTicketData={setTicketData} disabled={disabled} />
      <TicketTests
        ticketData={ticketData}
        setCorrectAnswer={setCorrectAnswer}
      />
    </main>
  );
}

export default Courses;
