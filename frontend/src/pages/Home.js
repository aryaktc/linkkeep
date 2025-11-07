import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Home(){
  const navigate = useNavigate();
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full p-6 bg-white rounded shadow'>
        <h1 className='text-2xl font-bold mb-4'>LinkKeep</h1>
        <p className='mb-4'>A simple bookmark manager. <Link to='/register' className='text-blue-600'>Register</Link> or <Link to='/login' className='text-blue-600'>Login</Link></p>
        <button onClick={()=>navigate('/bookmarks')} className='px-4 py-2 bg-blue-600 text-white rounded'>Go to Dashboard</button>
      </div>
    </div>
  );
}
