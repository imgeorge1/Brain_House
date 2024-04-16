import TicketRoutes from "../../components/ticketsComponent/TicketRoutes";
import TicketTests from "../../components/ticketsComponent/TicketTests";

const Tickets = () => {
  return (
    <main className="flex flex-col lg:flex-row items-center lg:items-start justify-evenly overflow-x-hidden md:overflow-x-auto">
      <TicketRoutes />
      <TicketTests />
    </main>
  );
};

export default Tickets;
