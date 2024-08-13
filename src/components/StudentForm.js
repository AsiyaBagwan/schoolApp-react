import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import './dashboard.css'
import Header from './Header';
import Sidebar from './Sidebar';

function StudentForm() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        class: '',
        mobile_number: ''
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Clear errors when user is typing
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation logic
        const newErrors = {};
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;

        if (!datePattern.test(formData.date_of_birth)) {
            newErrors.date_of_birth = 'Date of birth must be in the format YYYY-MM-DD.';
        } else {
            const classYearMap = {
                '1': 2017,
                '2': 2016,
                '3': 2015,
                '4': 2014,
                '5': 2013,
                '6': 2012,
                '7': 2011,
                '8': 2010,
                '9': 2009,
                '10': 2008,
            };
            const birthYear = parseInt(formData.date_of_birth.split('-')[0]);
            if (birthYear > classYearMap[formData.class]) {
                newErrors.date_of_birth = `For class ${formData.class}, the birthdate should be before June ${classYearMap[formData.class]}.`;
            }
        }

        // Check for other form validations if needed
        if (!/^[A-Z][a-zA-Z]*$/.test(formData.first_name)) {
            newErrors.first_name = 'First name must start with a capital letter and contain only letters.';
        }
        if (!/^[A-Z][a-zA-Z]*$/.test(formData.last_name)) {
            newErrors.last_name = 'Last name must start with a capital letter and contain only letters.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const endpoint = 'http://localhost:3001/createStudent';
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert('Student created successfully!');
                setFormData({
                    first_name: '',
                    last_name: '',
                    date_of_birth: '',
                    class: '',
                    mobile_number: ''
                });
                navigate('/student-list');  // Redirect to StudentList page
            } else {
                alert('Failed to save record. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to connect to the server. Please try again later.');
        }
    };

    return (
        <>
            <Header />
            <div className="main-content">
                <Sidebar />
                <div className="container1">
                    <div className="form-container">
                        <h2 className="h2class">Add Student Details 📝</h2>
                        <form id="registration-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="first_name">First Name:</label>
                                <input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    required
                                    pattern="[A-Z][a-zA-Z]*"
                                    title="Please enter a valid first name starting with a capital letter and containing only letters"
                                />
                                {errors.first_name && <span className="error-message">{errors.first_name}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name">Last Name:</label>
                                <input
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    required
                                    pattern="[A-Z][a-zA-Z]*"
                                    title="Please enter a valid last name starting with a capital letter and containing only letters"
                                />
                                {errors.last_name && <span className="error-message">{errors.last_name}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="date_of_birth">Date of Birth:</label>
                                <input
                                    type="date"
                                    id="date_of_birth"
                                    name="date_of_birth"
                                    value={formData.date_of_birth}
                                    onChange={handleChange}
                                    required
                                    title="Please select a valid date of birth"
                                />
                                {errors.date_of_birth && <span className="error-message">{errors.date_of_birth}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="class">Class:</label>
                                <select
                                    id="class"
                                    name="class"
                                    value={formData.class}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Class</option>
                                    <option value="1">Class 1</option>
                                    <option value="2">Class 2</option>
                                    <option value="3">Class 3</option>
                                    <option value="4">Class 4</option>
                                    <option value="5">Class 5</option>
                                    <option value="6">Class 6</option>
                                    <option value="7">Class 7</option>
                                    <option value="8">Class 8</option>
                                    <option value="9">Class 9</option>
                                    <option value="10">Class 10</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="mobile_number">Mobile Number:</label>
                                <input
                                    type="tel"
                                    id="mobile_number"
                                    name="mobile_number"
                                    value={formData.mobile_number}
                                    onChange={handleChange}
                                    required
                                    pattern="[5-9][0-9]{9}"
                                    title="Please enter a 10-digit mobile number starting with 5, 6, 7, 8, or 9"
                                />
                            </div>
                            <div className="form-btn">
                                <input type="submit" value="Submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StudentForm;
