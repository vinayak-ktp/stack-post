import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext';

const Login = () => {
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
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
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST', 
      body: JSON.stringify(formData),
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include',
    });
    if(response.ok) {
      response.json().then(user => setUserInfo(user));
      navigate('/');
    } else {
      alert('wrong credentials!');
    }
  }

  return (
    <main className='w-screen h-screen flex justify-center items-center bg-zinc-200'>
      <div className='shadow-md px-8 py-6 rounded-lg w-sm bg-zinc-100'>
        <h1 className='text-2xl font-bold text-left'>Sign In</h1>
        <p className='mb-6 text-xs font-semibold'>Create. Share. Inspire.</p>
        <form action="" className='flex flex-col gap-4' onSubmit={(e) => handleSubmit(e)}>
          <div className='border-b-[1.5px] flex items-center'>
            <i className="ri-user-line inline"></i>
            <input type="text" name='username' id='username' value={formData.username} placeholder='Username' onChange={handleChange}/>
          </div>
          <div className="border-b-[1.5px] flex items-center">
            <i className="ri-lock-2-line"></i>
            <input type="password" name='password' id='password' value={formData.password} placeholder='Password' onChange={handleChange} />
          </div>
          <button type='submit' className='px-2 py-1 mt-6 hover:bg-blue-500 bg-blue-400 rounded text-white text-sm font-semibold'>Submit</button>
          <p className='text-xs text-center font-semibold mt-2'>Don't have an Account? <Link to={'/register'} className='!text-indigo-600 !underline'>Sign Up</Link></p>
        </form>
      </div>
    </main>
  )
}

export default Login