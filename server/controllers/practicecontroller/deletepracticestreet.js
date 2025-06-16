import mongoConnection from "../../db/mongoConnection.js";

const { models } = await mongoConnection();

const deletePractice = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedDoc = await models.Practice.findOneAndUpdate(
      { "streets.fullinfo._id": id },
      {
        $pull: {
          "streets.$[].fullinfo": { _id: id },
        },
      },
      { new: true }
    );

    if (!updatedDoc) {
      return res.status(404).json({ error: "Not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete failed:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export default deletePractice;
