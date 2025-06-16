import mongoConnection from "../../db/mongoConnection.js";

const { models } = await mongoConnection();

const fetchPractice = async (req, res) => {
  try {
    const data = await models.Practice.find({});
    res.json(data);
  } catch (error) {
    console.error("Error fetching practice data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default fetchPractice;
