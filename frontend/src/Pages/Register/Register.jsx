import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'content-type' : 'application/json'
      }
    });
    if(response.ok) {
      alert("registration successfull!");
    } else {
      alert("registration failed!");
    }
  }

  return (
    <main className='w-screen h-screen flex justify-center items-center bg-zinc-200'>
      <div className='shadow-md px-8 py-6 w-sm rounded-lg bg-zinc-100'>
        <h1 className='text-2xl font-bold text-left'>Sign Up</h1>
        <p className='mb-6 text-xs font-semibold'>Unlock Your Creativity!</p>
        <form action="" className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='border-b-[1.5px] flex items-center'>
            <i className="ri-user-line inline"></i>
            <input type="text" name='username' id='username' placeholder='Username' value={formData.username} onChange={handleChange} />
          </div>
          <div className='border-b-[1.5px] flex items-center'>
            <i className="ri-mail-line"></i>
            <input type="text" name='email' id='email' placeholder='Email' value={formData.email} onChange={handleChange} />
          </div>
          <div className="border-b-[1.5px] flex items-center">
            <i className="ri-lock-2-line"></i>
            <input type="password" name='password' id='password' placeholder='Password' value={formData.password} onChange={handleChange} />
          </div>
          <button type='submit' className='px-2 py-1 mt-6 hover:bg-blue-500 bg-blue-400 rounded text-white text-sm font-semibold'>Submit</button>
          <p className='text-xs text-center font-semibold mt-2'>Already have an account? <Link to={'/login'} className='!text-indigo-600 !underline'>Sign In</Link></p>
        </form>
      </div>
    </main>
  )
}

export default Register