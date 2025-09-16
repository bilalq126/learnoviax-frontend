import { Link } from "react-router-dom";

const levels = ["Beginner", "Intermediate", "Advanced"];

export default function LevelSelect() {
  const handleSelectLevel = (level) => {
    localStorage.setItem("level", level);  // ✅ save selected level
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-50">
      <h2 className="text-3xl font-bold text-purple-700 mb-6">🎯 Select Your Level</h2>
      <div className="flex flex-col gap-4 w-72">
        {levels.map((level, i) => (
          <Link to="/quiz" key={i} onClick={() => handleSelectLevel(level)}>
            <button className="bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl font-semibold shadow-md w-full">
              {level}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
