import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Sidebar from './Sidebar';
import './styles.css';
import './dashboard.css';
import Header from './Header';

const TeacherForm = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        class: '',
        mobile_number: ''
    });

    const [dateError, setDateError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateDateOfBirth = (date) => {
        const minDate = new Date('1996-01-01');
        const maxDate = new Date('2000-12-31');
        const selectedDate = new Date(date);
        if (selectedDate < minDate || selectedDate > maxDate) {
            setDateError('This is not a valid birthdate for a teacher. Please select a date between 1996 and 2000.');
            return false;
        } else {
            setDateError('');
            return true;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateDateOfBirth(formData.date_of_birth)) {
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/createTeacher', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Teacher created successfully!');
                setFormData({
                    first_name: '',
                    last_name: '',
                    date_of_birth: '',
                    class: '',
                    mobile_number: ''
                });
                navigate('/teacher-list'); // Redirect to the teacher list page
            } else {
                alert('Failed to save record. Please try again.');
            }
        } catch (error) {
            console.error('Error creating teacher:', error);
            alert('Failed to save record. Please try again.');
        }
    };

    return (
        <>
        <Header />
        <div style={styles.pageContainer}>
            <Sidebar />
            <div style={styles.formContainer}>
                <h2 style={styles.heading}>Add Teacher Details 📝</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="first_name">First Name:</label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            style={styles.input}
                            required
                            pattern="[A-Z][a-zA-Z]*"
                            title="Please enter a valid first name starting with a capital letter and containing only letters"
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="last_name">Last Name:</label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            style={styles.input}
                            required
                            pattern="[A-Z][a-zA-Z]*"
                            title="Please enter a valid last name starting with a capital letter and containing only letters"
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="date_of_birth">Date of Birth:</label>
                        <input
                            type="date"
                            id="date_of_birth"
                            name="date_of_birth"
                            value={formData.date_of_birth}
                            onChange={handleChange}
                            style={styles.input}
                            required
                            min="1996-01-01"
                            max="2000-12-31"
                            title="Please select a valid date of birth"
                        />
                        {dateError && <span style={styles.error}>{dateError}</span>}
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="class">Class:</label>
                        <select
                            id="class"
                            name="class"
                            value={formData.class}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        >
                            <option value="">Select Class</option>
                            {Array.from({ length: 10 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>{`Class ${i + 1}`}</option>
                            ))}
                        </select>
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="mobile_number">Mobile Number:</label>
                        <input
                            type="tel"
                            id="mobile_number"
                            name="mobile_number"
                            value={formData.mobile_number}
                            onChange={handleChange}
                            style={styles.input}
                            required
                            pattern="[5-9][0-9]{9}"
                            title="Please enter a 10-digit mobile number starting with 5, 6, 7, 8, or 9"
                        />
                    </div>
                    <div style={styles.formBtn}>
                        <input type="submit" value="Submit" style={styles.submitBtn} />
                    </div>
                </form>
            </div>
        </div>
        </>
    );
};

export default TeacherForm;

const styles = {
    pageContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    formContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        border: '5px solid #4A235A',
        margin: 'auto',
        marginTop: '4.3rem'
    },
    heading: {
        color: '#4A235A',
        marginBottom: '20px'
    },
    form: {
        width: '100%'
    },
    formGroup: {
        marginBottom: '15px'
    },
    label: {
        display: 'block',
        marginBottom: '5px'
    },
    input: {
        width: '100%',
        padding: '8px',
        fontSize: '16px',
        border: '1px solid #4A235A',
        borderRadius: '4px',
        boxSizing: 'border-box'
    },
    error: {
        color: '#FF0000',
        fontSize: '14px'
    },
    formBtn: {
        textAlign: 'center'
    },
    submitBtn: {
        backgroundColor: '#4A235A',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '4px',
        transition: 'background-color 0.3s ease',
        marginTop: '20px'
    },
    submitBtnHover: {
        backgroundColor: '#311B92'
    }
};
