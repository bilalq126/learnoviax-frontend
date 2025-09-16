import { useState } from "react";
import { useNavigate } from "react-router-dom";

const courses = [
  "Python",
  "JavaScript",
  "Java",
  "C",
  "C++",
  "C#",
  "Go",
  "Rust",
  "Kotlin",
  "Swift",
  "PHP",
  "Ruby",
  "TypeScript",
  "Dart",
  "R"
];

export default function CourseSelect() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredCourses = courses.filter(course =>
    course.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectCourse = (course) => {
    localStorage.setItem("course", course);
    navigate("/level");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">📚 Choose a Course</h2>
      <div className="w-full max-w-2xl">
        <input
          type="text"
          placeholder="Search programming language..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="mb-6 px-4 py-2 border border-blue-300 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredCourses.length === 0 ? (
            <div className="col-span-full text-center text-blue-500">No results found.</div>
          ) : (
            filteredCourses.map((course, i) => (
              <button
                key={i}
                onClick={() => handleSelectCourse(course)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-md w-full transition-transform transform hover:scale-105"
              >
                {course}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

