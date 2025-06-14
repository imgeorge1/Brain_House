import mongoConnection from "../../db/mongoConnection.js";

const { models } = await mongoConnection();
let userCounter = 0;

const editUser = async (req, res) => {
  try {
    const { editUser } = req.body;
    const { firstName, lastName, email, age, city, phone, payDate } = editUser;

    if (!email) {
      return res.status(400).json({
        status: "error",
        message: "Email is required to update user info",
      });
    }

    // Check if user exists
    const existingUser = await models.User.findOne({ email });

    if (existingUser) {
      // Update existing user
      existingUser.firstName = firstName;
      existingUser.lastName = lastName;
      existingUser.age = age;
      existingUser.city = city;
      existingUser.phone = phone;
      existingUser.payDate = payDate;

      await existingUser.save();

      console.log("User updated:", existingUser);

      return res.status(200).json({
        status: "success",
        message: "User updated successfully",
        user: existingUser,
      });
    }

    // If user doesn't exist, create a new one
    const newUser = new models.User({
      firstName,
      lastName,
      email,
      age,
      city,
      phone,
      payDate,
    });

    await newUser.save();
    userCounter++;

    console.log(`User #${userCounter} created:`, newUser);

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error in editUser:", error.message);
    res
      .status(500)
      .json({ status: "error", message: "Failed to save user info" });
  }
};

export default editUser;
