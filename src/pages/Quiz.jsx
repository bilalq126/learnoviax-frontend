
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // <-- Replace with your Gemini API key
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + GEMINI_API_KEY;

function getPrompt(language, level) {
  return `Generate 10 multiple-choice programming quiz questions for ${language} at ${level} level. Each question should have 3 options and specify the correct answer. Format as JSON array: [{text, options, answer}].`;
}

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const language = localStorage.getItem("course") || "Python";
    const level = localStorage.getItem("level") || "Beginner";
    const prompt = getPrompt(language, level);

    async function fetchQuestions() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(GEMINI_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        });
        const data = await res.json();
        // Debug: print raw Gemini response to console
        console.log("Gemini API raw response:", data);
        let questionsJson = [];
        try {
          let text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
          console.log("Gemini API text part:", text);
          // Try to extract JSON array from text, even if extra text is present
          const match = text.match(/\[.*\]/s);
          if (match) {
            text = match[0];
          }
          questionsJson = JSON.parse(text);
          // Validate format
          if (!Array.isArray(questionsJson) || !questionsJson[0]?.text || !questionsJson[0]?.options || !questionsJson[0]?.answer) {
            throw new Error("Invalid question format");
          }
        } catch (err) {
          // Fallback to sample questions if Gemini fails
          questionsJson = [
            { text: "Which data structure uses FIFO?", options: ["Stack", "Queue", "Tree"], answer: "Queue" },
            { text: "Which OSI layer handles routing?", options: ["Transport", "Network", "Session"], answer: "Network" },
            { text: "Time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n^2)"], answer: "O(log n)" },
            { text: "Which protocol is used for sending emails?", options: ["SMTP", "HTTP", "FTP"], answer: "SMTP" },
            { text: "Primary key in DB must be?", options: ["Unique", "Nullable", "Duplicated"], answer: "Unique" },
            { text: "Supervised ML Algorithm?", options: ["K-Means", "Linear Regression", "Apriori"], answer: "Linear Regression" },
            { text: "React hook for state?", options: ["useEffect", "useState", "useReducer"], answer: "useState" },
            { text: "C++ supports which paradigm?", options: ["OOP", "Functional Only", "Procedural Only"], answer: "OOP" },
            { text: "Python list is implemented as?", options: ["Linked List", "Dynamic Array", "Hash Table"], answer: "Dynamic Array" },
            { text: "In Java, JVM stands for?", options: ["Java Virtual Machine", "Java Visual Model", "Joint Variable Manager"], answer: "Java Virtual Machine" },
          ];
          setError("Failed to parse questions from Gemini API. Showing sample questions instead.");
        }
        setQuestions(questionsJson);
      } catch (err) {
        setError("Error fetching questions from Gemini API.");
      }
      setLoading(false);
    }
    fetchQuestions();
  }, []);

  const handleAnswer = (option) => {
    if (option === questions[current].answer) {
      setScore(score + 1);
      setXp(xp + 10);
      setStreak(streak + 1);
      setFeedback(`✅ Correct! +10 XP 🔥 Streak: ${streak + 1}`);
    } else {
      setStreak(0);
      setFeedback("❌ Wrong! Streak reset.");
    }

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
        setFeedback("");
      } else {
        setFinished(true);
      }
    }, 1200);
  };

  const classifyStudent = () => {
    if (score >= 8) return "Advanced Learner 🚀";
    if (score >= 5) return "Intermediate Learner 📘";
    return "Beginner Learner 🌱";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 via-white to-green-100 font-sans">
      {/* ✅ Top Bar with Logo, XP, Streak */}
      <div className="flex justify-between items-center w-full max-w-2xl px-8 py-4">
        <img src={logo} alt="Learnoviax Logo" className="w-12 h-12" />
        <div className="flex gap-6">
          <p className="text-lg font-bold text-green-700">⭐ XP: {xp}</p>
          <p className="text-lg font-bold text-orange-600">🔥 Streak: {streak}</p>
        </div>
      </div>

      {loading ? (
        <div className="bg-white shadow-2xl rounded-3xl p-10 w-[32rem] text-center">
          <h2 className="text-xl font-bold mb-6 text-blue-600">Generating quiz questions...</h2>
          <p className="text-gray-500">Please wait while we fetch questions for your selected language and level.</p>
        </div>
      ) : error ? (
        <div className="bg-white shadow-2xl rounded-3xl p-10 w-[32rem] text-center">
          <h2 className="text-xl font-bold mb-6 text-red-600">Error</h2>
          <p className="text-gray-500">{error}</p>
        </div>
      ) : !finished ? (
        <div className="bg-white shadow-2xl rounded-3xl p-10 w-[32rem] text-center">
          <h2 className="text-xl font-bold mb-6">{questions[current]?.text}</h2>
          <div className="flex flex-col gap-3">
            {questions[current]?.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(option)}
                className="bg-green-500 hover:bg-green-600 transition-colors text-white py-3 px-5 rounded-xl text-lg font-medium shadow-md"
              >
                {option}
              </button>
            ))}
          </div>
          {feedback && (
            <p className="mt-6 text-lg font-semibold text-gray-700">{feedback}</p>
          )}
          <div className="mt-6 w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full transition-all"
              style={{ width: `${((current + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <p className="mt-2 text-gray-500">
            Question {current + 1} / {questions.length}
          </p>
        </div>
      ) : (
        <div className="bg-white shadow-2xl rounded-3xl p-10 w-[32rem] text-center">
          <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 Test Completed!</h2>
          <p className="text-lg mb-2">Your Score: {score}/{questions.length}</p>
          <p className="text-lg mb-2">Total XP: {xp}</p>
          <p className="text-xl font-semibold">{classifyStudent()}</p>

          {/* ✅ Proceed Button */}
          <button
            onClick={() => navigate("/signup")}
            className="mt-6 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-xl font-bold shadow-md"
          >
            Proceed ➡️
          </button>
        </div>
      )}
    </div>
  );
}

