import mongoConnection from "../../db/mongoConnection.js";
import { hashPassword } from "../../utils/hash.js";

// Inside your signup controller

const { models } = await mongoConnection();

const signupUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, age, city, phone } = req.body;

    // Check if user already exists (optional)
    const existingUser = await models.User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user with hashed password
    const newUser = new models.User({
      firstName,
      lastName,
      email,
      password: hashedPassword, // store hashed password
      age,
      city,
      phone,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
export default signupUser;
