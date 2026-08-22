require("dotenv").config();
const mongoose = require("mongoose");
const Course = require("./models/Course");

const course = {
  title: "Web Development for Beginners",

  description:
    "Learn the fundamentals of web development with HTML, CSS, JavaScript and React.",

  instructor: "Learnify",

  level: "Beginner",

  lessons: [
    {
      title: "Introduction to Web Development",
      videoUrl: "https://www.youtube.com/embed/UB1O30fR-EE"
    },
    {
      title: "HTML Basics",
      videoUrl: "https://www.youtube.com/embed/pQN-pnXPaVg"
    },
    {
      title: "CSS Basics",
      videoUrl: "https://www.youtube.com/embed/yfoY53QXEnI"
    },
    {
      title: "JavaScript Basics",
      videoUrl: "https://www.youtube.com/embed/W6NZfCO5SIk"
    },
    {
      title: "React Basics",
      videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk"
    }
  ]
};

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    await Course.deleteMany({});
    await Course.create(course);

    console.log("Course added successfully!");
    process.exit();
  })
  .catch((error) => {
    console.log("Error:", error);
    process.exit(1);
  });