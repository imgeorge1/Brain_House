import mongoConnection from "../../db/mongoConnection.js";

const { models } = await mongoConnection();

const editPractice = async (req, res) => {
  const { id } = req.params; // fullinfo ID
  const { address, lecturer, phone } = req.body;

  if (!address || !lecturer || !phone) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const updatedDoc = await models.Practice.findOneAndUpdate(
      { "streets.fullinfo._id": id },
      {
        $set: {
          "streets.$[street].fullinfo.$[info].address": address,
          "streets.$[street].fullinfo.$[info].lecturer": lecturer,
          "streets.$[street].fullinfo.$[info].phone": phone,
        },
      },
      {
        arrayFilters: [{ "street.fullinfo._id": id }, { "info._id": id }],
        new: true,
      }
    );

    if (!updatedDoc) {
      return res.status(404).json({ error: "Data not found" });
    }

    res.status(200).json(updatedDoc);
  } catch (error) {
    console.error("Update failed:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default editPractice;
