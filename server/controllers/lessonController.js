const Lesson = require("../models/lessonSchema");
const User = require("../models/userSchema");

const lessons = async (req, res) => {
  try {
    const { title, userId } = req.body;

    const user = await User.findById(userId);

    if (user && user.admin) {
      const newLesson = new Lesson({ title });

      await newLesson.save();

      res.status(201).json({
        status: "success",
        message: "Lesson added successfully",
        lesson: { title: newLesson.title },
      });
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const lessonsGET = async (req, res) => {
  try {
    const lessons = await Lesson.find({});

    console.log("lessons: ", lessons);

    res.status(200).json({ lessons });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { lessons, lessonsGET };
