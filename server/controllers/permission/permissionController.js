import mongoConnection from "../../db/mongoConnection.js";

const { models } = await mongoConnection();

const allowedNextCategory = async (req, res) => {
  try {
    const { completed, email } = req.body;
    const user = await models.User.findOne({ email: email });
    user.completed = completed;
    // console.log("allow user", user);

    await user.save();

    res.status(200).json({ message: "Permission granted", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default allowedNextCategory;
