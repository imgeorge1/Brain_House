import { useState } from "react";
import Exam from "../../components/exam/Exam";
import Tests from "../../components/tests/Tests";

const Exams = () => {
  const [start, setStart] = useState(true);

  return (
    <div className="overflow-x-hidden md:overflow-x-auto">
      {start && <Exam setStart={setStart} />}
      <Tests setStart={setStart} />
    </div>
  );
};

export default Exams;
