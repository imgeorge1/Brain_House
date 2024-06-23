import { useState } from "react";
import API from "../../utils/API";
import { toast } from "react-toastify";

const CommentForm = ({ addComment, currentUser }: any) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!currentUser) toast("ჯერ გაიარე რეგისტაცია!");
      else
        await API.post("/comments", {
          email: currentUser?.email,
          comment: text,
        });
      toast("კომენტარი დაემატა წარმატებით!");

      addComment(text);
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      ></textarea>
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Post Comment
      </button>
    </form>
  );
};

export default CommentForm;
