import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import API from "../../utils/API";
import { toast } from "react-toastify";
import axios from "axios";

const useGetComments = () => {
  const [comments, setComments] = useState<any[]>([]);
  const { currentUser } = useUserContext();

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const fetchedComments = await API.get("/comments", {
        withCredentials: true,
      });
      setComments(fetchedComments.data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = (comment: any) => {
    setComments((prevComments) => [...prevComments, comment]);
    fetchComments();
  };

  const handleDelete = async (index: number, id: number) => {
    try {
      await API.delete(`/comments/${id}`);
      const updatedComments = comments.filter((_, idx) => idx !== index); // Remove the comment at the specified index
      setComments(updatedComments); // Update the state with the modified comments array
      toast("კომენტარი წაიშალა წარმატებით!");
    } catch (error) {
      console.log(error);
    }
  };
  return { currentUser, addComment, handleDelete, comments };
};

export default useGetComments;
