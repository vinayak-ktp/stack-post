import React from 'react'
import { useNavigate } from 'react-router-dom';

const Blog = ({ post }) => {
  const { title, content, image, author } = post;
  const img = image ? image : 'default.jpg';
  const username = author.username;

  const navigate = useNavigate();

  return (
    <div
      className='shadow-bottom border-b border-zinc-300 h-20 w-full text-xs font-bold flex justify-between gap-2 items-center py-2 cursor-pointer'
      onClick={() => navigate(`/posts/${post._id}`)}
    >
      <div className="flex flex-col justify-start items-start w-8/10 h-5/6">
        <p className='text-blue-600 font-semibold'>{username}</p>
        <p className='text-black break-words whitespace-normal'>{title}</p>
      </div>
      <div className='w-2/10 h-5/6 rounded-lg overflow-hidden relative'>
        <div className="absolute top-0 left-0 h-full w-full bg-black opacity-20 z-10" />
        <img src={'http://localhost:3000/images/' + img} alt="blog-img"   className='w-full h-full object-cover' />
      </div>
    </div>
  )
}

export default Blog