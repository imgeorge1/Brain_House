import mongoConnection from "../../db/mongoConnection.js";

const { models } = await mongoConnection();

const signs = async (req, res) => {
  try {
    const sign = await models.Signs.find({ signID: req.params.id });

    if (!sign) {
      return res.status(404).json({ message: "Sign not found" });
    }

    res.status(200).json(sign);
  } catch (error) {
    console.error("Error while retrieving sign:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default signs;
