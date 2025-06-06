import mongoConnection from "../../db/mongoConnection.js";

const { models } = await mongoConnection();

const usersInfo = async (req, res) => {
  try {
    const userInfoList = await models.AdditionUserInfo.find({});
    // console.log(userInfoList);
    res.status(200).json({ userInfoList });
  } catch (error) {
    console.error("Error while fetching user information:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default usersInfo;
