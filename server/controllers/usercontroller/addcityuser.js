import mongoConnection from "../../db/mongoConnection.js";

const { models } = await mongoConnection();

const addUserCity = async (req, res) => {
  const { addCity } = req.body;
  const { email, city } = addCity;

  if (!city || !email) {
    return res.status(400).json({ error: "City and email are required." });
  }

  try {
    const user = await models.User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.isPaid) {
      return res.status(403).json({ error: "User has not paid." });
    }

    const updatedUser = await models.User.findOneAndUpdate(
      { email },
      { $addToSet: { purchased_locations: { $each: [city] } } },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error("Error adding city:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export default addUserCity;
