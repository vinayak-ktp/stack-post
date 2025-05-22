import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const logout = () => {
    fetch('http://localhost:3000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    navigate('/');
  }

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({ name: 'username', email: 'email@email.com' });

  useEffect(() => {
    fetch('http://localhost:3000/profile/', {
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

  const handleEdit = (post) => {
    navigate(`/edit/${post._id}`, { state: { post } });
  };

  const handleDelete = (postId) => {
    fetch(`http://localhost:3000/delete/${postId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(res => {
        if (res.ok) {
          setPosts(posts.filter(post => post._id !== postId));
        }
      });
  };

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
        <div>
          <button onClick={() => navigate('/')} className='px-3 h-8 bg-blue-600 rounded-lg text-white font-semibold'><i className="ri-home-9-line"></i></button>
          <button onClick={logout} className='px-3 h-8 bg-red-600 rounded-lg text-white font-semibold ml-2'><i className="ri-logout-box-r-line"></i></button>
        </div>
      </div>
      <h1 className='text-xl mt-5 mb-10 font-bold'>
        Let Your Creativity Flow - <a href='/create' className='!underline !text-indigo-800'>Create A Post!</a>
      </h1>

      {/* list of blogs */}
      <h1 className='text-xl mb-4 font-semibold'>Your Posts</h1>
      {posts.length > 0
        ? (
            <>
              {posts.map((post, idx) => (
                <div
                  key={post._id || idx}
                  className='flex items-center justify-between border rounded-md my-2 border-zinc-400 p-2 cursor-pointer hover:bg-zinc-300 transition'
                  onClick={() => navigate(`/posts/${post._id}`)}
                >
                  <h1 className='text-lg font-semibold'>{post.title}</h1>
                  <div
                    className="flex"
                    onClick={e => e.stopPropagation()}
                  >
                    <button
                      className='px-2 h-8 bg-blue-600 rounded text-white font-semibold mr-2'
                      onClick={() => handleEdit(post)}
                    >
                      <i className="ri-edit-line"></i>
                    </button>
                    <button
                      className='px-2 h-8 bg-red-600 rounded text-white font-semibold'
                      onClick={() => handleDelete(post._id)}
                    >
                      <i className="ri-delete-bin-7-line"></i>
                    </button>
                  </div>
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

export default Profile