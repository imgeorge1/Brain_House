import { useState, useEffect, useContext } from "react";
import categoryData2 from "../../data/categoryData2";
import { CheckboxState } from "../../types/Types";
import API from "../../utils/API";
import { UserContext } from "../../context/UserContext";

const Exam = () => {
  const [checkboxes, setCheckboxes] = useState<CheckboxState>({});
  const { setTicketData } = useContext(UserContext);

  // Initialize checkboxes state
  useEffect(() => {
    const initialState: CheckboxState = {};
    categoryData2.forEach((data) => {
      initialState[data.id] = false;
    });
    setCheckboxes(initialState);
  }, []);

  // Function to handle checkbox change
  const handleCheckboxChange = (id: number) => {
    setCheckboxes((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // Function to toggle all checkboxes
  const toggleAll = () => {
    const allChecked = Object.values(checkboxes).every((checked) => checked);
    const newCheckboxes: CheckboxState = {};
    Object.keys(checkboxes).forEach((id) => {
      newCheckboxes[parseInt(id)] = !allChecked;
    });
    setCheckboxes(newCheckboxes);
  };

  const handleFilteredCategory = async () => {
    const trueIndexes = Object.entries(checkboxes)
      .filter(([_, value]) => value === true)
      .map(([key]) => parseInt(key));
    const res = await API.post("/tickets", { data: trueIndexes });
    console.log(trueIndexes);
    setTicketData && setTicketData(res.data);
  };

  return (
    <div>
      <button
        onClick={toggleAll}
        className="ctrlbtn buttonBorder mt-6 ml-6 px-6 py-2 rounded-3xl duration-200 hover:bg-orange-500 text-xl text-black"
      >
        ყველა
      </button>
      <ul className="exam-list grid lg:grid-cols-3 md:grid-cols-2 gap-x-20 gap-y-6 m-4 p-4 max-w-full bg-[#2D2862] text-white rounded">
        {categoryData2.map((data) => (
          <li key={data.id} className="flex items-center justify-between">
            <label className="text-ellipsis   min-w-8" htmlFor={data.category}>
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
        onClick={handleFilteredCategory}
        className="ctrlbtn buttonBorder mბ-6 ml-6 px-6 py-2 rounded-3xl duration-200 hover:bg-orange-500 text-xl text-black"
      >
        გამოცდის დაწყება
      </button>
    </div>
  );
};

export default Exam;
