import mongoConnection from "../../db/mongoConnection.js";

const { models } = await mongoConnection();

const ticket = async (req, res) => {
  try {
    // let ticket;
    // if (req.params.id === "0") {
    //   ticket = await Ticket.find({});
    // } else {
    // }

    const ticket = await models.Ticket.find({ categoryID: req.params.id });

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default ticket;
