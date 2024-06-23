import { useState } from "react";
import CommentForm from "./CommentForm";

const Comments = () => {
  const [comments, setComments] = useState<string[]>([]);

  const addComment = (comment: any) => {
    setComments([...comments, comment]);
  };

  const handleDelete = (index: number) => {
    const updatedComments = [...comments];
    updatedComments.splice(index, 1); // Remove the comment at the specified index
    setComments(updatedComments); // Update the state with the modified comments array
  };

  return (
    <section className="p-4 bg-gray-100 mt-3">
      <h1 className="text-2xl font-bold mb-4">Comments</h1>
      {comments.map((comment, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-between items-center"
        >
          <p>{comment}</p>
          <button
            className="text-red-500 hover:text-red-700 focus:outline-none"
            onClick={() => handleDelete(index)}
          >
            Delete
          </button>
        </div>
      ))}
      <CommentForm addComment={addComment} className="mb-4" />
    </section>
  );
};

export default Comments;
