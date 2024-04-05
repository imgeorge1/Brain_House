import { useState } from "react";
import Exam from "../../components/exam/Exam";
import Tests from "../../components/tests/Tests";

const Exams = () => {
  const [start, setStart] = useState(true);

  return (
    <div>
      {start && <Exam setStart={setStart} />}
      <Tests setStart={setStart} />
    </div>
  );
};

export default Exams;
