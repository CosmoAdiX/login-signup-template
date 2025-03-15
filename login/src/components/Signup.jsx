import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state
  const navigate = useNavigate(); // Hook for navigation

  const handleSignup = async () => {
    setLoading(true); // Start loading
    setError(''); // Reset error message

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed. Please try again.');
      }

      const data = await response.json();
      console.log('Success:', data);

      // Redirect to login page after successful signup
      navigate('/login');
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='w-96 h-96 bg-gray-200 flex flex-col justify-center items-center gap-4'>
        <h1 className='text-4xl font-bold'>Signup</h1>
        <input
          type='text'
          placeholder='Username'
          className='w-3/4 p-2 rounded-md'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
          type='button'
          onClick={handleSignup}
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Signing up...' : 'Signup'}
        </button>
        {error && <p className='text-red-500'>{error}</p>} {/* Display error message */}
        <NavLink className='w-3/4 p-2 bg-green-400 text-white rounded-md text-center' to='/login'>
          Login
        </NavLink>
      </div>
    </div>
  );
};

export default Signup;