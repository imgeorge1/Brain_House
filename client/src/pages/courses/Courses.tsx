import Course from "../../components/course/Course";
import TicketTests from "../../components/ticketsComponent/TicketTests";
import useCourses from "../../hooks/useCourses/useCourses";

function Courses() {
  const { completedArray, setCorrectAnswer } = useCourses();
  return (
    <main className="flex flex-col items-center lg:flex-row lg:items-start justify-evenly">
      <Course completed={completedArray} />
      <TicketTests setCorrectAnswer={setCorrectAnswer} />
    </main>
  );
}

export default Courses;
