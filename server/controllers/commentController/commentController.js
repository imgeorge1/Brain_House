const Comments = require("../../models/commentsSchema");

const postComments = async (req, res) => {
  try {
    const { email, comment } = req.body;
    const newComment = new Comments({
      email,
      comment,
    });

    await newComment.save();

    console.log("comment added", newComment);

    res
      .status(201)
      .json({ status: "success", message: "Commented successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "error", message: "Commented failed" });
  }
};

const getComments = async (_, res) => {
  try {
    const allComments = await Comments.find({});

    res.status(200).json({
      status: "success",
      message: "Comment got successfully",
      comments: allComments,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "error", message: "Commented failed" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comments.findByIdAndDelete(req.params.id);

    console.log("comment deleted", deletedComment);

    res.status(200).json({
      status: "success",
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ status: "error", message: "Comment deleted failed" });
  }
};

module.exports = { postComments, getComments, deleteComment };
