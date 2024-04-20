import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../../utils/API";
import useWidth from "../useWidth/useWidth";
import { useUserContext } from "../../context/UserContext";

const useTicketRoutes = () => {
  const { setTicketData } = useUserContext();
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("რკინიგზის გადასასვლელი");
  const width = useWidth();
  const location = useLocation();

  const categoryId = parseInt(location.pathname.split("/")[2]);
  useEffect(() => {
    const getCategories = async (categoryId: number) => {
      try {
        const response = await API.get(`/tickets/${categoryId}`);
        setTicketData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (location.pathname.startsWith("/tickets/")) {
      getCategories(categoryId);
    }
  }, [categoryId, setTicketData]);

  const handleChooseCategory = (category: string) => {
    setShow(!show);
    setCategoryName(category);
  };

  return {
    show,
    setShow,
    categoryName,
    width,
    categoryId,
    handleChooseCategory,
  };
};

export default useTicketRoutes;
