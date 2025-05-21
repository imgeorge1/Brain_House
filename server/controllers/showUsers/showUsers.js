import mongoConnection from "../../db/mongoConnection.js";
import sendConfirmationEmail from "../../services/emailService.js";

const { models } = await mongoConnection();

const users = async (req, res) => {
  try {
    const users = await models.User.find({});
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUserPaidStatus = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { isPaid, payDate } = req.body;

    console.log("payDate >>>>>>>>>", payDate);

    const user = await models.User.findByIdAndUpdate(
      userId,
      { isPaid, payDate },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // if (user.isPaid !== true) {
    //   sendConfirmationEmail(user);
    // }

    console.log("Change Paid Status: ", user);

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { users, updateUserPaidStatus };
