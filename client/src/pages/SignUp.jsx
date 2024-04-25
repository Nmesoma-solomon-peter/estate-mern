import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {
  // useState def
  const [formData, setformData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  // function to update the setformData
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // function to handle submit to the data base.
  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success == false) {
        setLoading(false);
        setLoading(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in')
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7 '>Sign Up</h1>
      <form className='flex flex-col p-4 max-w-lg mx-auto gap-3' onSubmit={handleSubmit}>
        <input type="text" placeholder='username ' className='border p-3 rounded-lg' id='username' onChange={handleChange} />
        <input type="text" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
        <input type="text" placeholder='password ' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 p-3 text-white rounded-lg hover:opacity-95 disabled:opacity-80 uppercase'>{loading ? 'loading...' : 'Sign Up'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={"/Sign-In"} className='text-blue-700'>
          Sign in
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
