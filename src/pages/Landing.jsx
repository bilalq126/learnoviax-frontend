import { Link } from "react-router-dom";
import logo from "../assets/logo.png";   // ✅ add logo

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-200 via-green-100 to-white">
      <img src={logo} alt="Learnoviax Logo" className="w-24 mb-6" />   {/* ✅ show logo */}
      <h1 className="text-4xl font-extrabold text-green-700 mb-4">🌱 Learnoviax</h1>
      <p className="text-lg text-gray-600 mb-10">Your personalized AI learning journey</p>
      <div className="flex gap-6">
        <Link to="/course">
          <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg">
            Get Started
          </button>
        </Link>
        <Link to="/login">
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-8 py-4 rounded-xl text-lg font-bold shadow-lg">
            I Have an Account
          </button>
        </Link>
      </div>
    </div>
  );
}
