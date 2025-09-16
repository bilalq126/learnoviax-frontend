import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // get saved course/level
  const course = localStorage.getItem("course") || "Python";
  const level = localStorage.getItem("level") || "Beginner";

  const handleSignup = (e) => {
    e.preventDefault();
    const userData = { name, email, password, course, level };
    try {
      // Save to localStorage for frontend use
      localStorage.setItem("user", JSON.stringify(userData));
      // Save to CSV using Node.js utility (only works in Node/Electron, not browser)
      const { saveSignup } = window.require ? window.require("../utils/signup") : {};
      if (saveSignup) {
        saveSignup(userData);
        alert("Signup successful! 🎉 Data saved to CSV.");
      } else {
        alert("CSV utility not available in browser");
      }
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup error:", err);
      alert("⚠️ Error saving data");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-100">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          ✍️ Create Your Account
        </h2>

        {/* Show chosen course + level */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <p className="text-gray-700">
            <span className="font-bold">Course:</span> {course}
          </p>
          <p className="text-gray-700">
            <span className="font-bold">Level:</span> {level}
          </p>
        </div>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
            required
          />

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold shadow-md transition-colors"
          >
            Sign Up ➡️
          </button>
        </form>
      </div>
    </div>
  );
}
