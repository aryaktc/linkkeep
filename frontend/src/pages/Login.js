import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(process.env.REACT_APP_API_URL + '/api/auth/login', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('token', data.token);
      navigate('/bookmarks');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <form className='max-w-md w-full p-6 bg-white rounded shadow' onSubmit={submit}>
        <h2 className='text-xl font-bold mb-4'>Login</h2>
        {error && <div className='text-red-600 mb-2'>{error}</div>}
        <input required type='email' value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' className='w-full mb-2 p-2 border rounded'/>
        <input required type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='Password' className='w-full mb-4 p-2 border rounded'/>
        <button className='w-full py-2 bg-blue-600 text-white rounded'>Login</button>
        <p className='mt-3 text-sm'>No account? <Link to='/register' className='text-blue-600'>Register</Link></p>
      </form>
    </div>
  );
}
