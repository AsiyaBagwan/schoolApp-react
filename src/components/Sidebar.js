import React from 'react'
import { Link } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <img src="https://www.kindpng.com/picc/m/151-1516128_indira-institute-of-management-logo-hd-png-download.png" alt="Indira Logo" />
            </div>
            <div className="sidebar-menu">
                <Link to="/student-form">
                    <button><i className="fas fa-user-plus"></i> Add Student</button>
                </Link>
                <Link to="/student-list">
                    <button><i className="fas fa-list"></i> Student List</button>
                </Link>
                <Link to="/teacher-form">
                    <button><i className="fas fa-chalkboard-teacher"></i> Add Teacher</button>
                </Link>
                <Link to="/teacher-list">
                    <button><i className="fas fa-users"></i> Teacher List</button>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar
