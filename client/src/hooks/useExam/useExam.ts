import { useState, useEffect } from "react";
import categoryData from "../../data/categoryData";
import { CheckboxState } from "../../types/Types";
import API from "../../utils/API";
import { useUserContext } from "../../context/UserContext";

const useExam = () => {
  const [checkboxes, setCheckboxes] = useState<CheckboxState>({});
  const { setTicketData } = useUserContext();

  // Initialize checkboxes state
  useEffect(() => {
    const initialState: CheckboxState = {};
    categoryData.forEach((data) => {
      initialState[data.id] = true;
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
    setTicketData(res.data);
  };

  return {
    checkboxes,
    handleCheckboxChange,
    toggleAll,
    handleFilteredCategory,
  };
};

export default useExam;
