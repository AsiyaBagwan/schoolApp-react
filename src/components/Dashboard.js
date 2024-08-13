import React from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';
import Sidebar from './Sidebar';
import Header from './Header';

const Dashboard = () => {
    return (
        <div className="dashboard-layout">
            <Header />
            <div className="main-content">
                <Sidebar />
                <div className="dashboard">
                    <div className="container">
                        <div className="content">
                            <h2>Welcome to the Dashboard</h2>
                            <p>Select an option from the sidebar to get started.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
