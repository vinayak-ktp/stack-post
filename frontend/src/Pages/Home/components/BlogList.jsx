import React from 'react'
import Blog from './Blog'

const BlogList = ({ posts }) => {
  return (
    <div className='h-full w-full flex flex-col gap-2 overflow-scroll no-scrollbar rounded-lg'>
      {posts && posts.length > 0 ? (
        posts.map((post) => <Blog post={post} key={post._id} />)
      ) : (
        <div>No posts found.</div>
      )}
    </div>
  )
}

export default BlogList