import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import TeacherForm from './components/TeacherForm';
import TeacherList from './components/TeacherList';
import StudentDetails from './components/StudentDetails'; // Import StudentDetails
import './App.css';
import TeacherDetails from './components/TeacherDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/student-form" element={<StudentForm />} />
        <Route path="/student-list" element={<StudentList />} />
        <Route path="/student-details/:id" element={<StudentDetails />} />
        <Route path="/Teacher-form" element={<TeacherForm />} />
        <Route path="/teacher-list" element={<TeacherList />} />
        <Route path="/teacher-details/:id" element={<TeacherDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
