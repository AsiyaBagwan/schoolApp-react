import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';
import './dashboard.css';
import Pagination from './Pagination'; // Import Pagination component
import Header from './Header';
import Sidebar from './Sidebar';

const StudentList = () => {
    const [students, setStudents] = useState([]); // Initialize with empty array
    const [filterClass, setFilterClass] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const limit = 10;

    const apiUrl = 'http://localhost:3001/students';

    // Function to fetch students based on pagination and filter
    const fetchStudents = async (page = 1, limit = 10, filterClass = '') => {
        setLoading(true);
        try {
            const response = await axios.get(apiUrl);
            if (response.status !== 200) {
                throw new Error('Failed to fetch students');
            }
            let data = response.data;

            // Filter data by class if filter is applied
            if (filterClass) {
                data = data.filter(student => student.class === filterClass);
            }

            setStudents(data);
            setTotalPages(Math.ceil(data.length / limit));
        } catch (error) {
            console.error('Error fetching students:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents(currentPage, limit, filterClass);
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
                <div className="container-StudentList">
                    <div className="">

                        <h2 className='studentlist'>Student List</h2>
                        <div className="filter-container">
                            <select id="studentFilter" className="student-Filter" value={filterClass} onChange={handleClassFilterChange}>
                                <option value="">All Classes</option>
                                {[...Array(10)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                            <button className="search-button" onClick={() => fetchStudents(1, limit, filterClass)}>&#128269;</button>
                            <button className="clear-button" onClick={clearFilters}>Clear</button>
                        </div>
                        <table id="studentTable">
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
                                {students.slice((currentPage - 1) * limit, currentPage * limit).map(student => (
                                    <tr key={student.id}>
                                        <td><Link to={`/student-details/${student.id}`}>{student.id}</Link></td>
                                        <td>{student.firstname}</td>
                                        <td>{student.lastname}</td>
                                        <td>{student.date_of_birth}</td>
                                        <td>{student.class}</td>
                                        <td>{student.mobileNo}</td>
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
                            <Link to="/student-form">&larr; Back to registration form</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentList;
