import { motion } from "framer-motion";
import categoryData from "../../data/categoryData";
import useExam from "../../hooks/useExam/useExam";
import { Link } from "react-router-dom";
import back from "../../assets/back.png";

const Exam = ({
  setStart,
}: {
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    checkboxes,
    handleCheckboxChange,
    toggleAll,
    handleFilteredCategory,
  } = useExam();

  const filteredAndStart = () => {
    handleFilteredCategory();
    setStart(false);
  };

  return (
    <div className="mb-28">
      <button className="ml-3 mt-24 block">
        {" "}
        <Link
          to="/tickets/21"
          className="flex rounded-lg hover:bg-slate-300 duration-200"
        >
          <img src={back} width={18} alt="back" />{" "}
          <p className="px-1">დაბრუნება</p>
        </Link>
      </button>
      <motion.button
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.8, stiffness: 100 }}
        onClick={toggleAll}
        className="buttonBorder mt-10 ml-4 px-6 py-2 pb-2 rounded-3xl duration-200 hover:bg-orange-500 text-xl hover:text-white "
      >
        ყველა
      </motion.button>
      <ul className="exam-list grid lg:grid-cols-3 md:grid-cols-2 gap-x-20 gap-y-6 m-4 p-4 max-w-full bg-[#2D2862] text-white rounded">
        {categoryData.map((data) => (
          <motion.li
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", duration: 1, damping: 10 }}
            key={data.id}
            className="flex items-center justify-between"
          >
            <label
              className="text-ellipsis cursor-pointer min-w-8"
              htmlFor={data.category}
            >
              {data.category}
            </label>
            <input
              className="cursor-pointer"
              type="checkbox"
              id={data.category}
              checked={!!checkboxes[data.id]}
              onChange={() => handleCheckboxChange(data.id)}
            />
          </motion.li>
        ))}
      </ul>
      <motion.button
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.8, damping: 10 }}
        onClick={filteredAndStart}
        className="buttonBorder mt-2 mb-2 ml-4 px-6 py-2 pb-2 rounded-3xl duration-200 hover:bg-orange-500 text-xl hover:text-white "
      >
        გამოცდის დაწყება
      </motion.button>
    </div>
  );
};

export default Exam;
