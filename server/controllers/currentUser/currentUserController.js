import mongoConnection from "../../db/mongoConnection.js";

const { models } = await mongoConnection();

const currentUser = async (req, res) => {
  try {
    const session = res.locals.session;
    // console.log("currentUser>>>>>>>>>>>>>>", session);
    const { email } = session.user;

    const user = await models.User.findOne({
      email,
    });
    const useraditionalinfo = await models.AdditionUserInfo.findOne({
      email,
    });

    if (!user) {
      console.error("user not found");
      return res.status(404).json({ error: "User Not Found" });
    }

    const { firstName, lastName, completed, isPaid } = user;
    const city = useraditionalinfo?.city || null;

    res.json({ firstName, lastName, email, completed, isPaid, city });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default currentUser;
