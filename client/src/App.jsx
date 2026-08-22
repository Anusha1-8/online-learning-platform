import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courseError, setCourseError] = useState("");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  // =========================
  // GET COURSE FROM BACKEND
  // =========================
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/courses"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch course");
        }

        const data = await response.json();

        // Backend returns an array
        if (data.length > 0) {
          setCourse(data[0]);
        } else {
          setCourseError("No course found.");
        }
      } catch (error) {
        console.error(error);
        setCourseError("Unable to load course.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, []);

  // =========================
  // LOGIN
  // =========================
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("Login successful!");
      setPage("home");
    } catch (error) {
      setMessage(
        "Server error. Make sure backend is running."
      );
    }
  };

  // =========================
  // REGISTER
  // =========================
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message || "Registration failed"
        );
        return;
      }

      setMessage(
        "Registration successful! Please login."
      );

      setRegisterData({
        name: "",
        email: "",
        password: "",
      });

      setPage("login");
    } catch (error) {
      setMessage(
        "Server error. Make sure backend is running."
      );
    }
  };

  // =========================
  // HOME PAGE
  // =========================
  if (page === "home") {
    return (
      <div>
        {/* NAVBAR */}
        <nav className="navbar">
          <div className="logo">Learnify</div>

          <div className="nav-links">
            <button onClick={() => setPage("home")}>
              Home
            </button>

            <button onClick={() => setPage("course")}>
              Course
            </button>

            <button onClick={() => setPage("lessons")}>
              Lessons
            </button>

            <button
              className="login-btn"
              onClick={() => {
                setMessage("");
                setPage("login");
              }}
            >
              Login
            </button>
          </div>
        </nav>

        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <p className="welcome">
              WELCOME TO LEARNIFY
            </p>

            <h1>
              Learn. Practice.
              <br />
              Grow.
            </h1>

            <p>
              Start your web development journey with our
              beginner-friendly course.
            </p>

            <button
              className="start-btn"
              onClick={() => setPage("course")}
            >
              Start Learning
            </button>
          </div>

          <div className="hero-card">
            <div className="code-icon">
              &lt;/&gt;
            </div>

            <h2>Web Development</h2>

            <p>
              HTML • CSS • JavaScript • React
            </p>
          </div>
        </section>

        {/* FEATURED COURSE */}
        <section className="featured">
          <p className="featured-label">
            FEATURED COURSE
          </p>

          <h2>
            {course
              ? course.title
              : "Web Development for Beginners"}
          </h2>

          {loading && (
            <p className="loading">
              Loading course...
            </p>
          )}

          {courseError && (
            <p className="error">
              {courseError}
            </p>
          )}

          {course && (
            <div className="course-card">
              {/* LEFT SIDE */}
              <div className="course-image">
                <div className="course-icon">
                  &lt;/&gt;
                </div>

                <h3>WEB</h3>
              </div>

              {/* RIGHT SIDE */}
              <div className="course-info">
                <span className="level">
                  {course.level}
                </span>

                <h2>{course.title}</h2>

                <p className="description">
                  {course.description}
                </p>

                <p className="instructor">
                  <strong>Instructor:</strong>{" "}
                  {course.instructor}
                </p>

                <p className="lesson-count">
                  <strong>
                    {course.lessons?.length || 0}
                  </strong>{" "}
                  Lessons
                </p>

                <button
                  className="view-course-btn"
                  onClick={() => setPage("course")}
                >
                  View Course
                </button>
              </div>
            </div>
          )}
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <h2>Learnify</h2>

          <p>Online Learning Platform</p>

          <p>Learn. Practice. Grow.</p>
        </footer>
      </div>
    );
  }

  // =========================
  // LOGIN PAGE
  // =========================
  if (page === "login") {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h1>Welcome Back</h1>

          <p>Login to continue learning</p>

          {message && (
            <div className="message">
              {message}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  email: e.target.value,
                })
              }
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  password: e.target.value,
                })
              }
              required
            />

            <button type="submit">
              Login
            </button>
          </form>

          <p className="switch-text">
            Don't have an account?{" "}

            <button
              onClick={() => {
                setMessage("");
                setPage("register");
              }}
            >
              Create Account
            </button>
          </p>

          <button
            className="back-btn"
            onClick={() => setPage("home")}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // REGISTER PAGE
  // =========================
  if (page === "register") {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h1>Create Account</h1>

          <p>Start your learning journey</p>

          {message && (
            <div className="message">
              {message}
            </div>
          )}

          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Full Name"
              value={registerData.name}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  name: e.target.value,
                })
              }
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  email: e.target.value,
                })
              }
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  password: e.target.value,
                })
              }
              required
            />

            <button type="submit">
              Create Account
            </button>
          </form>

          <p className="switch-text">
            Already have an account?{" "}

            <button
              onClick={() => {
                setMessage("");
                setPage("login");
              }}
            >
              Login
            </button>
          </p>

          <button
            className="back-btn"
            onClick={() => setPage("home")}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // COURSE PAGE
  // =========================
  if (page === "course") {
    return (
      <div className="simple-page">
        {course ? (
          <>
            <span className="level">
              {course.level}
            </span>

            <h1>{course.title}</h1>

            <p>{course.description}</p>

            <p>
              <strong>Instructor:</strong>{" "}
              {course.instructor}
            </p>

            <h2>Course Lessons</h2>

            <div className="course-lessons">
              {course.lessons?.map(
                (lesson, index) => (
                  <div
                    className="lesson-card"
                    key={lesson._id || index}
                  >
                    <h3>
                      {index + 1}.{" "}
                      {lesson.title}
                    </h3>

                    <button
                      onClick={() =>
                        window.open(
                          lesson.videoUrl,
                          "_blank"
                        )
                      }
                    >
                      Watch Lesson
                    </button>
                  </div>
                )
              )}
            </div>
          </>
        ) : (
          <p>Loading course...</p>
        )}

        <button
          onClick={() => setPage("home")}
        >
          ← Back to Home
        </button>
      </div>
    );
  }

  // =========================
  // LESSONS PAGE
  // =========================
  if (page === "lessons") {
    return (
      <div className="simple-page">
        <h1>Course Lessons</h1>

        {course?.lessons?.map(
          (lesson, index) => (
            <div
              className="lesson-card"
              key={lesson._id || index}
            >
              <h2>
                {index + 1}.{" "}
                {lesson.title}
              </h2>

              <a
                href={lesson.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Lesson on YouTube
              </a>
            </div>
          )
        )}

        <button
          onClick={() => setPage("home")}
        >
          ← Back to Home
        </button>
      </div>
    );
  }

  return null;
}

export default App;