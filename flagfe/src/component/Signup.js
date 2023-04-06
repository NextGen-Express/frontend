import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';
//import { API_BASE_URL } from '../config.js';

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const phoneNumbers = /^[0-9]+$/;
    const phoneValid = phoneNumbers.test(phone_number) && phone_number.length === 10;
  
    const passwordRegex = /^.{2,}$/;
    const passwordValid = passwordRegex.test(password);

    const errors = {};
  
    if (!username) {
      errors.username = 'Please enter a username.';
    }
    if (!first_name) {
      errors.first_name = 'Please enter your first name.';
    }
    if (!last_name) {
      errors.last_name = 'Please enter your last name.';
    }
    if (!password) {
      errors.password = 'Please enter a password.';
    } else if (!passwordValid) {
      errors.password = 'Please enter a password with at least 2 characters.';
    }
    if (!phone_number) {
      errors.phone_number = 'Please enter a phone number.';
    } else if (!phoneValid) {
      errors.phone_number = 'Please enter a valid 10-digit phone number.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

      const userData = { username, first_name, last_name, password, phone_number };
      try {
        const response = await fetch(`/register`, {
         method: 'POST',
         headers: {
          'Content-Type': 'application/json',
         },
         body: JSON.stringify(userData),
        });
    
        if (response.status === 201) {
          navigate('/login');
        } else if (response.status === 409) {
          const contentType = response.headers.get('Content-Type');
          if (contentType && contentType.indexOf('application/json') !== -1) {
            const data = await response.json();
            setError(data.message);
          } else {
            const errorText = await response.text();
            setError(errorText);
          }
        } else {
          throw new Error('Network response was not OK');
        }
      } catch (error) {
        console.error('Error signing up:', error);
      }
  };
  
  


  return (
    <div className="signup">
      <h1>Signup</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
          {fieldErrors.username && <div className="error">{fieldErrors.username}</div>}
        </label>
        <label>
          First Name:
          <input type="text" value={first_name} onChange={handleFirstNameChange} />
          {fieldErrors.first_name && <div className="error">{fieldErrors.first_name}</div>}
        </label>
        <label>
          Last Name:
          <input type="text" value={last_name} onChange={handleLastNameChange} />
          {fieldErrors.last_name && <div className="error">{fieldErrors.last_name}</div>}
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
          {fieldErrors.password && <div className="error">{fieldErrors.password}</div>}
        </label>
        <label>
          Phone Number:
          <input type="phone" value={phone_number} onChange={handlePhoneNumberChange} />
          {fieldErrors.phone_number && <div className="error">{fieldErrors.phone_number}</div>}
        </label>
        {/* <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label> */}
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default Signup;

