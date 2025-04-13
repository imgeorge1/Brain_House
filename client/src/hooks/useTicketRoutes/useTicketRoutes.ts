import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../../utils/API";
import useWidth from "../useWidth/useWidth";
import { useUserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import axios from "axios";

const useTicketRoutes = () => {
  const { setTicketData, currentUser, correctAnswer } = useUserContext();
  const location = useLocation();
  // const [completed, setCompleted] = useState<number>(() => {
  //   const localCompleted = localStorage.getItem("completed");
  //   return localCompleted
  //     ? parseInt(localCompleted)
  //     : currentUser?.completed || 2;
  // });
  const [completed, setCompleted] = useState<number>(32);
  const [categoryId, setCategoryId] = useState(
    currentUser ? currentUser.completed : completed
  );

  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("რკინიგზის გადასასვლელი");
  const width = useWidth();

  const categoryIndex = location.state ? parseInt(location.state) : 1;

  const changeCategory = categoryIndex === categoryId;

  const categoryNumber = parseInt(location.pathname.split("/")[2]);

  const getUser = async () => {
    const res = await API.get("/user");
    console.log(res);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const getCategories = async (categoryId: number) => {
      try {
        const response = await axios.get(`/tickets/${categoryId}`, {
          withCredentials: true,
        });
        setTicketData && setTicketData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (location.pathname.startsWith("/tickets/")) {
      getCategories(categoryNumber);
    }
  }, [categoryNumber, setTicketData]);

  useEffect(() => {
    //  correctAnswer > 2 && changeCategory && currentUser
    if (
      correctAnswer > 2 &&
      changeCategory &&
      currentUser &&
      categoryNumber !== 30
    ) {
      setCompleted((prevCompleted) => prevCompleted + 1);
      toast("გილოცავთ ! თქვენ გახსენით შემდეგი კატეგორია !");
    } else if (correctAnswer > 2 && !currentUser && changeCategory) {
      toast("თქვენ არ გაქვთ ავტორიზაცია გავლილი !");
    }
  }, [correctAnswer]);

  useEffect(() => {
    const updated = {
      email: currentUser?.email,
      completed: completed,
    };
    const allowNextCategory = async () => {
      try {
        await API.put("/user", updated);
      } catch (error) {
        console.log(error);
      }
    };

    if (correctAnswer > 2 && changeCategory && currentUser) {
      allowNextCategory();
      getUser();
      setCategoryId(completed);
      localStorage.setItem("completed", completed.toString());
    }
  }, [completed]);

  const handleChooseCategory = (category: string) => {
    setShow(!show);
    setCategoryName(category);
  };

  const completedArray = Array.from(Array(completed), (_, index) => index + 1);

  return {
    show,
    setShow,
    categoryNumber,
    width,
    categoryId,
    handleChooseCategory,
    completedArray,
    categoryName,
    currentUser,
  };
};

export default useTicketRoutes;
