import mongoConnection from "../../db/mongoConnection.js";

const { models } = await mongoConnection();

const oldUser = async (req, res) => {
  try {
    // Fetch the users from both collections
    const users = await models.OldUser.find();
    const usersInfo = await models.OldAdditionUserInfo.find();

    // Merging logic: Merge users from both collections based on the email
    const mergedUsers = users.map((user) => {
      // Find the matching OldUserInfo based on the email
      const additional = usersInfo.find((info) => info.email === user.email);

      // Merge user data with additional info (if any)
      return {
        ...user.toObject(),
        ...(additional ? additional.toObject() : {}),
      };
    });

    // Send the merged data as the response
    res.status(200).json({ mergedUsers });
  } catch (err) {
    console.error("Error merging old users:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default oldUser;
