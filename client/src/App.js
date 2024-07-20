import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import StudentLoginPage from './pages/StudentLoginPage/StudentLoginPage'
import FacultyLoginPage from './pages/FacultyLoginPage/FacultyLoginPage'
import HodLoginPage from './pages/HodLoginPage/HodLoginPage';
import AdminLoginPage from './pages/AdminLoginPage/AdminLoginPage';
import StudentDashboard from './components/Student/StudentDashboard'
import FacultyDashboard from './components/Faculty/FacultyDashboard';
import HodDashboard from './components/Hod/HodDashboard'
import AdminDashboard from "./components/Admin/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' index element={<HomePage />} />
        <Route path='/student-login' element={<StudentLoginPage />} />
        <Route path='/faculty-login' element={<FacultyLoginPage />} />
        <Route path='/hod-login' element={<HodLoginPage />} />
        <Route path='/admin-login' element={<AdminLoginPage />} />
        <Route path='/student-dashboard/:rollNumber' element={<StudentDashboard />} />
        <Route path='/faculty-dashboard/:username' element={<FacultyDashboard />} />
        <Route path='/hod-dashboard/:username' element={<HodDashboard />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>   
  );
}

export default App;
