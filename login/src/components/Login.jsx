import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async () => {
    setLoading(true); // Start loading
    setError(''); // Reset error message

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // If login is successful, redirect to /profile
        navigate('/profile');
      } else {
        // If login fails, set error message
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='w-96 h-96 bg-gray-200 flex flex-col justify-center items-center gap-4'>
        <h1 className='text-4xl font-bold'>Login</h1>
        <input
          type='email'
          placeholder='Email'
          className='w-3/4 p-2 rounded-md'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          className='w-3/4 p-2 rounded-md'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className='w-3/4 p-2 bg-blue-400 text-white rounded-md'
          onClick={handleLogin}
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className='text-red-500'>{error}</p>} {/* Display error message */}
        <NavLink className='w-3/4 p-2 bg-green-400 text-white rounded-md text-center' to='/signup'>
          Signup
        </NavLink>
      </div>
    </div>
  );
};

export default Login;