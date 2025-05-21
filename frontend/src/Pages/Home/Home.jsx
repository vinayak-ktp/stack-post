import React, { useContext, useEffect, useState } from 'react'
import Header from './components/Header'
import TopPost from './components/TopPost'
import Searchbar from './components/Searchbar'
import BlogList from './components/BlogList'
import { UserContext } from '../../contexts/UserContext'

const Home = () => {
  const {userInfo, setUserInfo} = useContext(UserContext);
  console.log(userInfo);
  useEffect(() => {
    fetch('http://localhost:3000/profile', { credentials: 'include' })
    .then(response => {
      response.json().then(user => {
        setUserInfo(user)
      });
    })
  }, []);

  const username = userInfo?.username;

  return (
    <main className='h-screen w-screen flex bg-linear-to-r from-zinc-300 to-zinc-100'>
      <div className='w-[70%] max-h-screen flex flex-col'>
        <Header /> 
        <TopPost img={"https://techcrunch.com/wp-content/uploads/2024/12/GettyImages-1370995239.jpeg?resize=1536,1024"}/>
      </div>
      <div className='w-[30%] p-3 pr-6 pb-5 h-screen flex flex-col'>
        <div className='flex justify-between items-end mb-3'>
          <Searchbar />
          <a href={username ? '/profile' : '/login'} className='px-1 text-xl border-2 rounded-xl'><i className="ri-user-fill"></i></a>
        </div>
        <BlogList />
      </div>
    </main>
  )
}

export default Home