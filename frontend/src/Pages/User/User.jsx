import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const User = () => {
  const navigate = useNavigate();
  const { username } = useParams();

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({ name: 'username', email: 'email@email.com' });

  useEffect(() => {
    fetch('http://localhost:3000/profile', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(currUser => {
        if (currUser.username === username) {
          navigate('/profile');
        }
      })
      .catch(() => {
        console.error('Error fetching user data');
        navigate('/')
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/user/${username}`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setUser({ name: data.username || '', email: data.email || '' }))
      .catch(() => setUser({ name: 'username', email: 'email@email.com' }));
  }, []);

  useEffect(() => {
    if (!user.name) return;
    fetch('http://localhost:3000/getposts', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setPosts(data.filter(post => post.author.username === user.name));
      })
      .catch(() => setPosts([]));
  }, [user.name]);

  return (
    <main className='w-screen min-h-screen h-full p-8 bg-linear-to-b from-zinc-300 to-zinc-100'>
      <div className='w-full h-10 flex justify-between mb-10'>
        <div className='flex items-center'>
          <img src="https://www.svgrepo.com/show/508195/user.svg" alt="profile-img" className='border-2 h-full aspect-square rounded-xl'/>
          <div className="ml-3 ">
            <h1 className='text-2xl font-bold tracking-tight'>{user.name}</h1>
            <p className='text-xs font-semibold text-zinc-700'>{user.email}</p>
          </div>
        </div>
        <button onClick={() => navigate('/')} className='px-3 h-8 bg-blue-600 rounded-lg text-white font-semibold'><i className="ri-home-9-line"></i></button>
      </div>

      {/* list of blogs */}
      <h1 className='text-xl mb-4 font-semibold'><p className='font-extrabold inline'>{username}</p>'s posts</h1>
      {posts.length > 0
        ? (
            <>
              {posts.map((post, idx) => (
                <div
                  key={post._id || idx}
                  className='border rounded-md my-2 border-zinc-400 p-2 cursor-pointer hover:bg-zinc-300 transition relative overflow-hidden'
                  onClick={() => navigate(`/posts/${post._id}`)}
                >
                  <div className='h-12 absolute left-0 top-0 w-1 bg-blue-500'></div>
                  <h1 className='text-lg font-semibold'>{post.title}</h1>
                </div>
              ))}
            </>
        )
        : (
          <p className='text-sm font-semibold text-zinc-500'>Nothing To See Here :(</p>
        )
      }
    </main>
  )
}

export default User