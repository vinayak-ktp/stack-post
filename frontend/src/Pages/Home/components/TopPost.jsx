import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TopPost = ({ post }) => {
  const { title, content, image, author } = post;
  const navigate = useNavigate();

  return (
    <div className='h-full overflow-hidden p-5 hover:cursor-pointer' onClick={() => navigate(`/posts/${post._id}`)}>
      <div className="h-full w-full overflow-hidden rounded-xl relative shadow-xl">
        {/* Background Image Layer */}
        <div 
          style={{
            backgroundImage: `url(http://localhost:3000/images/${image ? image : 'default.jpg'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          className="absolute top-0 left-0 h-full w-full z-0"
        />
        
        {/* Background Color Layer */}
        <div className="absolute top-0 left-0 h-full w-full bg-black opacity-30 z-10" />
        
        {/* Text Layers */}
        {/* <div className='text-zinc-300 text-xl font-semibold absolute top-0 pl-3 pr-10 py-3 bg-linear-to-r from-zinc-800 to-transparent z-20'>
          <p>Top Post</p>
        </div> */}
        <div className='text-white absolute bottom-0 p-4 pt-20 text-xl font-semibold bg-linear-to-t from-black to-transparent z-20 tracking-wide w-full'>
          <p className='mb-1 text-blue-500'>{author.username}</p>
          <p>{title}</p>
        </div>
      </div>
    </div>
  );
};

export default TopPost;
