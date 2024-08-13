import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Sidebar from './Sidebar';
import './styles.css';

const TeacherDetails = () => {
    const { id } = useParams(); // Using useParams to get id from URL
    const [teacher, setTeacher] = useState(null); // State to store teacher data
    const [loading, setLoading] = useState(true); // State to manage loading state

    useEffect(() => {
        const fetchTeacher = async () => {
            setLoading(true); // Set loading to true when fetching data

            try {
                const apiUrl = `http://localhost:3001/Teachers/${id}`;
                const response = await axios.get(apiUrl);
                if (response.status !== 200) {
                    throw new Error('Failed to fetch teacher details');
                }
                setTeacher(response.data); // Update state with fetched teacher data
            } catch (error) {
                console.error('Error fetching teacher details:', error);
            } finally {
                setLoading(false); // Set loading to false when fetch completes
            }
        };

        fetchTeacher();
    }, [id]); // Dependency on id to re-fetch teacher details when id changes

    // Handling loading state
    if (loading) {
        return <div>Loading teacher details...</div>;
    }

    // Handling case where teacher is not yet fetched or API request fails
    if (!teacher) {
        return <div>Teacher not found or error fetching data.</div>;
    }

    // Render teacher details in a list format
    return (
        <>
            <div className="dashboard-layout">
                <Header />
                <div className="main-content">
                    <Sidebar />
                    <div className="studentdetailcontainerr">
                        <h2>Teacher Details</h2>
                        <ul className="teacher-details-list">
                            <li>
                                <strong>ID:</strong> {teacher.id}
                            </li>
                            <li>
                                <strong>First Name:</strong> {teacher.firstname}
                            </li>
                            <li>
                                <strong>Last Name:</strong> {teacher.lastname}
                            </li>
                            <li>
                                <strong>Date of Birth:</strong> {teacher.date_of_birth}
                            </li>
                            <li>
                                <strong>Class:</strong> {teacher.class}
                            </li>
                            <li>
                                <strong>Mobile No:</strong> {teacher.mobileNo}
                            </li>
                            {/* Add more details as needed */}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeacherDetails;
