import mongoConnection from "../../db/mongoConnection.js";

const { models } = await mongoConnection();

const practice = async (req, res) => {
  const { city, street, address, lecturer, phone } = req.body;

  if (!city || !street || !address || !lecturer || !phone) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    let practiceDoc = await models.Practice.findOne({ city });

    const newFullinfo = { address, lecturer, phone };

    if (practiceDoc) {
      const streetObj = practiceDoc.streets.find((s) => s.street === street);

      if (streetObj) {
        const fullinfoExists = streetObj.fullinfo.some(
          (info) => info.address === address
        );

        if (fullinfoExists) {
          return res
            .status(409)
            .json({ error: "This fullinfo already exists for the street." });
        }

        streetObj.fullinfo.push(newFullinfo);
        await practiceDoc.save();
      } else {
        // Street doesn't exist yet
        practiceDoc.streets.push({
          street,
          fullinfo: [newFullinfo],
        });
        await practiceDoc.save();
      }
    } else {
      // City doesn't exist
      practiceDoc = await models.Practice.create({
        city,
        streets: [
          {
            street,
            fullinfo: [newFullinfo],
          },
        ],
      });
    }

    res.status(201).json(practiceDoc);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error." });
  }
};

export default practice;
