const AdditionUserInfo = require("../../models/AdditionUserInfoSchema");

const usersInfo = async (req, res) => {
  try {
    const userInfoList = await AdditionUserInfo.find({});

    res.status(200).json({ userInfoList });
  } catch (error) {
    console.error("Error while fetching user information:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = usersInfo;
