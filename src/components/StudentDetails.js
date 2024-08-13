import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Sidebar from './Sidebar';
import './styles.css';

const StudentDetails = () => {
    const { id } = useParams(); // Using useParams to get id from URL
    const [student, setStudent] = useState(null); // State to store student data
    const [loading, setLoading] = useState(true); // State to manage loading state

    useEffect(() => {
        const fetchStudent = async () => {
            setLoading(true); // Set loading to true when fetching data

            try {
                const apiUrl = `http://localhost:3001/students/${id}`;
                const response = await axios.get(apiUrl);
                if (response.status !== 200) {
                    throw new Error('Failed to fetch student details');
                }
                setStudent(response.data); // Update state with fetched student data
            } catch (error) {
                console.error('Error fetching student details:', error);
            } finally {
                setLoading(false); // Set loading to false when fetch completes
            }
        };

        fetchStudent();
    }, [id]); // Dependency on id to re-fetch student details when id changes

    // Handling loading state
    if (loading) {
        return <div>Loading student details...</div>;
    }

    // Handling case where student is not yet fetched or API request fails
    if (!student) {
        return <div>Student not found or error fetching data.</div>;
    }

    // Render student details in a table format
    return (
        <>
            <div className="dashboard-layout">
                <Header />
                <div className="main-content">
                    <Sidebar />
                    <div className='studentdetailcontainerr' >
                    <h2>Student Details</h2>

                    <table className="student-details-table">
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Date of Birth</th>
                                <th>Class</th>
                                <th>Mobile No</th>
                            </tr>
                            <tr>
                                <td>{student.id}</td>
                                <td>{student.firstname}</td>
                                <td>{student.lastname}</td>
                                <td>{student.date_of_birth}</td>
                                <td>{student.class}</td>
                                <td>{student.mobileNo}</td>
                            </tr>
                           
                            {/* Add more details as needed */}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentDetails;
