import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';
//import { API_BASE_URL } from '../config.js';

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  //const [email, setEmail] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  }

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  // const handleEmailChange = (event) => {
  //   setEmail(event.target.value);
  // };

  const test = (input) => {
    const capitalLetter = /[A-Z]/;
    const number = /[0-9]/;
    return input.length >= 6 && capitalLetter.test(input) && number.test(input);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const phoneNumbers = /^[0-9]+$/;
    const phoneValid = phoneNumbers.test(phone_number) && phone_number.length === 10;
  
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    const passwordValid = passwordRegex.test(password);

  
    if (!username || !first_name || !last_name || !password || !phone_number) {
      setError('Please fill in all fields.');
    } else if (!phoneValid) {
      setPhoneNumberError('Please enter a valid 10-digit phone number.');
    } else if (!passwordValid) {
      setPasswordError('Please enter a password with at least 6 characters, one capital letter, and one number.');
    } else {
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
        </label>
        <label>
          First Name:
          <input type="text" value={first_name} onChange={handleFirstNameChange} />
        </label>
        <label>
          Last Name:
          <input type="text" value={last_name} onChange={handleLastNameChange} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
          {passwordError && <div className="error">{passwordError}</div>}
        </label>
        <label>
          Phone Number:
          <input type="phone" value={phone_number} onChange={handlePhoneNumberChange} />
          {phoneNumberError && <div className="error">{phoneNumberError}</div>}
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

