import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        setError('');
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setError('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        fetch('/login', {
            method: 'POST',
            body: formData
        })
        .then(response => {  
            if (response.ok) {
                localStorage.setItem('isLoggedIn', true);
                navigate('/');
            } else {
                setError('Invalid username or password');
            }
        })
        .catch(error => {
            console.error('Error during login', error);
            setError('An error occurred during login');
        });
    };
    return (
        <div className="login">
            <h1>Login</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={handleUsernameChange} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <button type="submit">Log In</button>
            </form>
            <p>
                Don't have an account?{' '}
                <a color="blue" onClick={() => navigate('/signup')}>
                    Signup
                </a>
            </p>
        </div>
    );
}

export default Login;