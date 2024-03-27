import { useState } from "react";
import Exam from "../../components/exam/Exam";
import Tests from "../../components/tests/Tests";
import { TicketsTypes } from "../../types/Types";

const Exams = () => {
  const [data, setData] = useState<TicketsTypes[]>([]);

  return (
    <div>
      <Exam setData={setData} />
      <Tests data={data} />
    </div>
  );
};

export default Exams;
