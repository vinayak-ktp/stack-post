import React from 'react'
import { useContext } from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const BlogPost = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className='p-10'>Loading...</div>;

  return (
    <div className='h-screen w-[100vw] overflow-x-hidden bg-linear-to-b from-zinc-300 to-zinc-100'>
      <div className='w-[80%] min-h-screen flex flex-col py-10 m-auto'>
        <h1 className='text-3xl font-bold'>{post.title}</h1>
        <p className='text-sm font-bold text-blue-500'>{post.author.username}</p>
        <img src={'http://localhost:3000/images/' + (post.image || 'default.jpg')} alt={post.title} className='w-full h-[200px] object-cover rounded my-4' />
        <div className='w-full'>
          {post.content.split('\n').map((line, idx) => (
            <p key={idx} className='text-xl w-full py-1 break-words text-justify'>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogPost