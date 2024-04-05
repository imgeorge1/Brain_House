import categoryData2 from "../../data/categoryData2";
import useExam from "../../hooks/useExam/useExam";

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
      <button
        onClick={toggleAll}
        className="buttonBorder mt-36 ml-4 px-6 py-2 pb-2 rounded-3xl duration-200 hover:bg-orange-500 text-xl hover:text-white "
      >
        ყველა
      </button>
      <ul className="exam-list grid lg:grid-cols-3 md:grid-cols-2 gap-x-20 gap-y-6 m-4 p-4 max-w-full bg-[#2D2862] text-white rounded">
        {categoryData2.map((data) => (
          <li key={data.id} className="flex items-center justify-between">
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
          </li>
        ))}
      </ul>
      <button
        onClick={filteredAndStart}
        className="buttonBorder mt-2 mb-2 ml-4 px-6 py-2 pb-2 rounded-3xl duration-200 hover:bg-orange-500 text-xl hover:text-white "
      >
        გამოცდის დაწყება
      </button>
    </div>
  );
};

export default Exam;
