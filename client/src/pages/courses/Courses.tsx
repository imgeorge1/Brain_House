import Course from "../../components/course/Course";
import TicketTests from "../../components/ticketsComponent/TicketTests";
import useTicketRoutes from "../../hooks/useTicketRoutes/useTicketRoutes";
import useCourses from "../../hooks/useCourses/useCourses";

function Courses() {
  const { setTicketData } = useTicketRoutes();
  const { completedArray, setCorrectAnswer } = useCourses();
  return (
    <main className="flex flex-col items-center lg:flex-row lg:items-start justify-evenly">
      <Course setTicketData={setTicketData} completed={completedArray} />
      <TicketTests setCorrectAnswer={setCorrectAnswer} />
    </main>
  );
}

export default Courses;
