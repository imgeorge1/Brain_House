import CommentForm from "./CommentForm";
import useGetComments from "../../hooks/useGetComments/useGetComments";

const Comments = () => {
  const { currentUser, addComment, handleDelete, comments } = useGetComments();

  return (
    <section className="p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Comments</h1>
      {comments?.map((comment, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-between items-center"
        >
          <p>{comment.comment}</p>
          {currentUser?.email === comment.email && (
            <button
              className="text-red-500 hover:text-red-700 focus:outline-none"
              onClick={() => handleDelete(index, comment._id)}
            >
              Delete
            </button>
          )}
        </div>
      ))}
      <CommentForm
        addComment={addComment}
        currentUser={currentUser}
        className="mb-4"
      />
    </section>
  );
};

export default Comments;
