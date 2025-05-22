import React, { useContext, useEffect, useState } from 'react'
import Header from './components/Header'
import TopPost from './components/TopPost'
import BlogList from './components/BlogList'
import { UserContext } from '../../contexts/UserContext'

const Home = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [topPost, setTopPost] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/profile', { credentials: 'include' })
      .then(response => response.json())
      .then(user => setUserInfo(user));
  }, [setUserInfo]);

  useEffect(() => {
    fetch('http://localhost:3000/getposts')
      .then(res => res.json())
      .then(data => {
      if (data && data.length > 0) {
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        const randomIndex = Math.floor(Math.random() * shuffled.length);
        setTopPost(shuffled[randomIndex]);
        setPosts(shuffled.filter((_, index) => index !== randomIndex));
      }
      });
  }, []);

  const username = userInfo?.username;

  const [searchText, setSearchText] = useState('');

  const filteredPosts = searchText
    ? posts.filter(post =>
        post.title.toLowerCase().includes(searchText.toLowerCase())
      )
    : posts;

  return (
    <main className='h-screen w-screen flex bg-linear-to-b from-zinc-300 to-zinc-100'>
      <div className='w-[70%] max-h-screen flex flex-col'>
        <Header />
        {topPost && (
          <TopPost post={topPost} />
        )}
      </div>
      <div className='w-[30%] p-3 pr-6 pb-5 h-screen flex flex-col'>
        <div className='flex justify-between items-end mb-3'>
          <div className='mr-5 py-2 h-10 flex items-center border-b-2 w-full'>
            <i className="ri-search-line text-xl"></i>
            <input
              type="text"
              placeholder='search'
              className='w-full px-3 text-lg font-semibold outline-none'
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
          </div>
          <a href={username ? `/profile/` : '/login'} className='px-1 text-xl border-2 rounded-lg'><i className="ri-user-fill"></i></a>
        </div>
        <BlogList posts={filteredPosts} />
      </div>
    </main>
  );
}

export default Home