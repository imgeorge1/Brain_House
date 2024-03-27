import { useEffect, useState } from "react";
import categoryData from "../../data/categoryData";
import { useLocation } from "react-router-dom";
import API from "../../utils/API";
import { TicketsTypes } from "../../types/Types";
import useWidth from "../../hooks/useWidth";

const useTicketRoutes = () => {
  const [ticketData, setTicketData] = useState<TicketsTypes[]>([]);
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("ყველა");
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
    getCategories(categoryId);
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
    categoryData,
    setTicketData,
    ticketData,
  };
};

export default useTicketRoutes;
