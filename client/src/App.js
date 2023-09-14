import { Route, Routes } from "react-router-dom";
import { Login, Signup } from "./pages";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import StudentPage from "./pages/Student";
import StaffPage from "./pages/Staff";
import CleanerPage from "./pages/Cleaner";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Student" element={<StudentPage />} />
        <Route path="/Staff" element={<StaffPage />} />
        <Route path="/Cleaner" element={<CleanerPage />} />

        
      </Routes>
    </div>
  );
}

export default App;
