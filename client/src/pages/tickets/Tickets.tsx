import { useState } from "react";
import TicketRoutes from "../../components/ticketsComponent/TicketRoutes";
import TicketTests from "../../components/ticketsComponent/TicketTests";
import { TicketsTypes } from "../../types/Types";

const Tickets = () => {
  const [ticketData, setTicketData] = useState<TicketsTypes[]>([]);

  return (
    <main className="flex flex-col lg:flex-row">
      <TicketRoutes setTicketData={setTicketData} />
      <TicketTests ticketData={ticketData} />
    </main>
  );
};

export default Tickets;
