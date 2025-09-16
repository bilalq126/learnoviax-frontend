import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import CourseSelect from "./pages/CourseSelect";
import LevelSelect from "./pages/LevelSelect";
import Quiz from "./pages/Quiz";   // ✅ new import
import Signup from "./pages/Signup";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/course" element={<CourseSelect />} />
        <Route path="/level" element={<LevelSelect />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
