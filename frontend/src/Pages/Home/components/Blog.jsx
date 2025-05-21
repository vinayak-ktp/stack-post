import React from 'react'

const Blog = ({ img }) => {
  return (
    <div className='shadow-bottom border-b border-zinc-300 h-20 text-xs font-bold flex justify-between gap-2 items-center py-2'>
      <div className="">
        <p className='text-blue-700'>category</p>
        <p className='leading-tight'>Neom is reportedly turning into a financial disaster, except for McKinsey & Co. Lorem, ipsum.</p>
      </div>
      <div className='w-4/10 h-5/6 rounded-lg overflow-hidden relative'>
        <div className="absolute top-0 left-0 h-full w-full bg-black opacity-20 z-10" />
        <img src={img} alt="blog-img" className='w-full h-full object-cover' />
      </div>
    </div>
  )
}

export default Blog