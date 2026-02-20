import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmployeesPage from "./pages/EmployeesPage";
import ProjectsPage from "./pages/ProjectsPage";
import LeavesPage from "./pages/LeavesPage";
import SalaryPage from "./pages/SalaryPage";
import ProfilePage from "./pages/ProfilePage";
import "./App.css";

function App() {
  const [employee, setEmployee] = useState(() => {
    const storedEmployee = localStorage.getItem("employee");
    return storedEmployee ? JSON.parse(storedEmployee) : null;
  });

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={<Login onLogin={setEmployee} />} 
          />
          <Route 
            path="/dashboard" 
            element={employee ? <Dashboard employee={employee} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/employees" 
            element={employee ? <EmployeesPage employee={employee} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/projects" 
            element={employee ? <ProjectsPage employee={employee} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/leaves" 
            element={employee ? <LeavesPage employee={employee} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/salary" 
            element={employee ? <SalaryPage employee={employee} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/profile" 
            element={employee ? <ProfilePage employee={employee} /> : <Navigate to="/" />} 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;