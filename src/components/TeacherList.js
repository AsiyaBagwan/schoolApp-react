import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';
import './dashboard.css';
import Pagination from './Pagination';
import Header from './Header';
import Sidebar from './Sidebar';

const TeacherList = () => {
    const [teachers, setTeachers] = useState([]);
    const [filterClass, setFilterClass] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const limit = 10;

    // Function to fetch teachers based on pagination and filter
    const fetchTeachers = async (page = 1, limit = 10, filterClass = '') => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3001/Teachers'); // Replace with your actual API URL
            if (response.status !== 200) {
                throw new Error('Failed to fetch teachers');
            }
            let data = response.data;

            // Filter data by class if filter is applied
            if (filterClass) {
                data = data.filter(teacher => teacher.class === filterClass);
            }

            setTeachers(data);
            setTotalPages(Math.ceil(data.length / limit));
        } catch (error) {
            console.error('Error fetching teachers:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeachers(currentPage, limit, filterClass);
    }, [currentPage, filterClass]);

    const handleClassFilterChange = (event) => {
        setFilterClass(event.target.value);
        setCurrentPage(1); // Reset to the first page when filter changes
    };

    const clearFilters = () => {
        setFilterClass('');
        setCurrentPage(1); // Reset to the first page when filters are cleared
    };

    const handlePaginationClick = (page) => {
        setCurrentPage(page);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard-layout">
            <Header />
            <div className="main-content">
                <Sidebar />
                <div className="container">
                    <div className="TeacherListContainer">
                        <h2 className='studentlist'>Teacher List</h2>
                        <div className="filter-container">
                            <select id="teacherFilter" className="teacher-Filter" value={filterClass} onChange={handleClassFilterChange}>
                                <option value="">All Classes</option>
                                {[...Array(10)].map((_, i) => (
                                    <option key={i} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                            <button className="search-button" onClick={() => fetchTeachers(1, 10, filterClass)}>&#128269;</button>
                            <button className="clear-button" onClick={clearFilters}>Clear</button>
                        </div>
                        <table id="teacherTable">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Date of Birth</th>
                                    <th>Class</th>
                                    <th>Mobile No</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teachers.slice((currentPage - 1) * limit, currentPage * limit).map(teacher => (
                                    <tr key={teacher.id}>
                                        <td><Link to={`/teacher-details/${teacher.id}`}>{teacher.id}</Link></td>
                                        <td>{teacher.firstname}</td>
                                        <td>{teacher.lastname}</td>
                                        <td>{teacher.date_of_birth}</td>
                                        <td>{teacher.class}</td>
                                        <td>{teacher.mobileNo}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            handlePaginationClick={handlePaginationClick}
                        />
                        <div className="back-link">
                            <Link to="/teacher-form">&larr; Back to registration form</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherList;
