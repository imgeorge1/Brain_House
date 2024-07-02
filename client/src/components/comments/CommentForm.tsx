import { useState } from "react";
import API from "../../utils/API";
import { toast } from "react-toastify";

const CommentForm = ({ addComment, currentUser }: any) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!currentUser) {
        toast("ჯერ გაიარე რეგისტაცია!");
      } else {
        await API.post("/comments", {
          email: currentUser?.email,
          fullName: currentUser.firstName + " " + currentUser.lastName,
          comment: text,
        });
        toast("კომენტარი დაემატა წარმატებით!");

        addComment(text);
      }
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none 
        focus:border-b-[#663aac] duration-200 resize-none"
        placeholder="დაწერეთ კომენტარი..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      ></textarea>
      <button
        type="submit"
        className="mt-2 px-4 py-2 hover:bg-[#230751] text-white rounded-lg bg-[#663aac] duration-200
        focus:outline-none focus:bg-[#663aac]"
      >
        კომენტარი
      </button>
    </form>
  );
};

export default CommentForm;
