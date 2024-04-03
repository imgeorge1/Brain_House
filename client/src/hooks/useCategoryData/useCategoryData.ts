import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useLocation } from "react-router-dom";
import API from "../../utils/API";

const useCategoryData = () => {
  const { setTicketData } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("ყველა");
  const location = useLocation();

  const categoryId = parseInt(location.pathname.split("/")[2]);

  useEffect(() => {
    const getCategories = async (categoryId: number) => {
      try {
        const response = await API.get(`/tickets/${categoryId}`);
        setTicketData && setTicketData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (
      location.pathname.startsWith("/courses/") ||
      location.pathname.startsWith("/tickets/")
    ) {
      getCategories(categoryId);
    }
  }, [categoryId, setTicketData]);

  const handleChooseCategory = (category: string) => {
    setShow(!show);
    setCategoryName(category);
  };

  return { show, setShow, categoryName, categoryId, handleChooseCategory };
};

export default useCategoryData;
