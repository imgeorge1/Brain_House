import mongoConnection from "../../db/mongoConnection.js";

const { models } = await mongoConnection();

const ticketTest = async (req, res) => {
  try {
    // Extracting data from the request body
    const { data: selectedIds } = req.body;

    // Perform aggregation query to get tickets
    const tickets = await models.Ticket.aggregate([
      // Match documents based on the array of IDs
      { $match: { categoryID: { $in: selectedIds } } },
      // Randomly select documents
      { $sample: { size: 30 } },
    ]);

    // Send response with HTTP status 200 and the retrieved tickets
    res.status(200).json(tickets);
  } catch (error) {
    // Log any errors that occur
    console.error("Error fetching tickets:", error);
    // Send an appropriate error response
    res.status(500).json({ error: "Internal server error" });
  }
};
export default ticketTest;
