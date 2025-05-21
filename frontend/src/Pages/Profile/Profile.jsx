import React from 'react'
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

  const [posts, setPosts] = React.useState([]);
  const [user, setUser] = React.useState({ name: 'username', email: 'email@email.com' });

  React.useEffect(() => {
    // Fetch user info
    fetch('http://localhost:3000/profile', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setUser({ name: data.username || '', email: data.email || '' }))
      .catch(() => setUser({ name: 'username', email: 'email@email.com' }));

    // Fetch posts
    fetch('http://localhost:3000/getposts', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setPosts(Array.isArray(data) ? data.map(post => post.title) : []))
      .catch(() => setPosts([]));
  }, []);

  return (
    <main className='w-screen min-h-screen h-full p-8'>
      <div className='w-full h-10 flex justify-between mb-10'>
        <div className='flex items-center'>
          <img src="https://www.svgrepo.com/show/508195/user.svg" alt="profile-img" className='border-2 h-full aspect-square rounded-xl'/>
          <div className="ml-3 ">
            <h1 className='text-2xl font-bold tracking-tight'>{user.name}</h1>
            <p className='text-xs font-semibold text-zinc-700'>{user.email}</p>
          </div>
        </div>
        <button onClick={logout} className='px-2 h-8 bg-red-600 rounded-lg text-white font-semibold'>Logout</button>
      </div>
      <h1 className='text-xl mt-5 mb-10 font-bold'>
        Let Your Creativity Flow - <a href='/create' className='!underline !text-indigo-800'>Create A Post!</a>
      </h1>

      {/* list of blogs */}
      <h1 className='text-xl mb-4 font-semibold'>Your Posts</h1>
      {posts.length > 0
        ? (
            <>
              {posts.map((title, idx) => (
              <div key={idx} className='flex items-center justify-between border rounded-md my-2 border-zinc-400 p-2'>
                <h1 className='text-lg font-semibold'>{title}</h1>
                <div>
                  <button className='px-2 h-8 bg-blue-600 rounded text-white font-semibold mr-2'><i class="ri-edit-line"></i></button>
                  <button className='px-2 h-8 bg-red-600 rounded text-white font-semibold'><i class="ri-delete-bin-7-line"></i></button>
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