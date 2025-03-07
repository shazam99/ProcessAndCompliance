import React from 'react';
import { NavLink} from 'react-router-dom';
import './Homepage.css';

function Homepage() {
    return (
        <div className="homepage-container">
            <h1>Welcome to Onboarding Tool</h1>
            <div className="button-container">
                <NavLink to="/register">
                    <button className="register-button">Register</button>
                </NavLink>
                <NavLink to="/login">
                    <button className="login-button">Login</button>
                </NavLink>
            </div>
        </div>
    );
}

export default Homepage;