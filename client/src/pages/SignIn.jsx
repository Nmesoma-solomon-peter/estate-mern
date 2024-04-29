import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {signInStart,signInFailure,signInSuccess} from '../redux/user/userSlice';

export default function SignIn() {
  // useState def
  const [formData, setformData] = useState({});
 const {loading, error} = useSelector((state) => state.user);

  const navigate = useNavigate();
  //initialise user dispatch
  const dispatch = useDispatch();
  // function to update the setformData
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // function to handle submit to the data base.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.successful === false) {
      dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
     dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7 '>Sign In</h1>
      <form className='flex flex-col p-4 max-w-lg mx-auto gap-3' onSubmit={handleSubmit}>
    
        <input type="text" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
        <input type="text" placeholder='password ' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 p-3 text-white rounded-lg hover:opacity-95 disabled:opacity-80 uppercase'>{loading ? 'loading...' : 'Sign In'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={"/Sign-Up"} className='text-blue-700'>
          Sign Up
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
