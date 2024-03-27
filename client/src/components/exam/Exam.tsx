import { useState, useEffect } from "react";
import categoryData2 from "../../data/categoryData2";
import { CheckboxState, TicketsTypes } from "../../types/Types";
import API from "../../utils/API";

const Exam = ({
  setData,
}: {
  setData: React.Dispatch<React.SetStateAction<TicketsTypes[]>>;
}) => {
  const [checkboxes, setCheckboxes] = useState<CheckboxState>({});

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
    setData(res.data);
  };

  return (
    <div>
      <button onClick={toggleAll}>ყველა</button>
      <ul className="grid grid-cols-2 gap-x-8 gap-y-6 m-4 p-4 max-w-[700px]">
        {categoryData2.map((data) => (
          <li key={data.id} className="flex items-center justify-between">
            <label
              className="text-ellipsis whitespace-nowrap overflow-hidden"
              htmlFor={data.category}
            >
              {data.category}
            </label>
            <input
              type="checkbox"
              id={data.category}
              checked={!!checkboxes[data.id]}
              onChange={() => handleCheckboxChange(data.id)}
            />
          </li>
        ))}
      </ul>
      <button onClick={handleFilteredCategory}>fetch filtered category</button>
    </div>
  );
};

export default Exam;
