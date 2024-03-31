import TicketRoutes from "../../components/ticketsComponent/TicketRoutes";
import TicketTests from "../../components/ticketsComponent/TicketTests";

const Tickets = () => {
  // const [ticketData, setTicketData] = useState<TicketsTypes[]>([]);

  return (
    <main className="flex flex-col lg:flex-row items-center lg:items-start justify-evenly">
      <TicketRoutes />
      <TicketTests />
    </main>
  );
};

export default Tickets;
