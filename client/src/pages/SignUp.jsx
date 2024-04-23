import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div>
      <h1 className='text-3xl text-center font-semibold my-7 '>Sign Up</h1>
      <form className='flex flex-col p-4 max-w-lg mx-auto gap-3'>
        <input type="text" placeholder='username ' className='border p-3 rounded-lg' id='username' />
        <input type="text" placeholder='email' className='border p-3 rounded-lg' id='email' />
        <input type="text" placeholder='password ' className='border p-3 rounded-lg' id='password' />
        <button className='bg-slate-700 p-3 text-white rounded-lg hover:opacity-95 disabled:opacity-80 uppercase'>Sign up</button>
      </form>
      <div className='flex gap-4 mt-5'>
        <p>Have an account?</p>
        <Link to={"/Sign-In"} className='text-blue-700'>
          Sign in
        </Link>
      </div>
    </div>
  )
}
