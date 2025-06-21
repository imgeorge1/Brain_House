import mongoConnection from "../../db/mongoConnection.js";

const { models } = await mongoConnection();

const practice = async (req, res) => {
  const { city, street, address, lecturer, phone, price, saleprice } = req.body;

  if (!city || !street || !address || !lecturer || !phone) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    let practiceDoc = await models.Practice.findOne({ city });

    const newFullinfo = { address, lecturer, phone, price, saleprice };

    if (practiceDoc) {
      // Check if street already exists under this city
      const streetObj = practiceDoc.streets.find((s) => s.street === street);

      if (streetObj) {
        // Check if the address already exists under the street
        const fullinfoExists = streetObj.fullinfo.some(
          (info) => info.address === address
        );

        if (fullinfoExists) {
          return res
            .status(409)
            .json({ error: "This address already exists for the street." });
        }

        // Add new address to existing street
        streetObj.fullinfo.push(newFullinfo);
      } else {
        // Street doesn't exist — add it with the new address
        practiceDoc.streets.push({
          street,
          fullinfo: [newFullinfo],
        });
      }

      await practiceDoc.save();
    } else {
      // City doesn't exist — create everything
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

    return res.status(201).json(practiceDoc);
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Server error." });
  }
};

export default practice;
