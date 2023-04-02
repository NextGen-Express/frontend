import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Username: ${username}, Password: ${password}`);
    };

    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={handleUsernameChange} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <button type="submit" onClick={() => navigate("/")}>Log In</button>
            </form>
            <p>Don't have an account? <a color='blue' onClick={() => navigate("/Signup")}>Signup</a></p>
        </div>
    );
}

export default Login;
