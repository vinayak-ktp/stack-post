import React from 'react'

const Searchbar = () => {
  return (
    <div className='mr-5 py-2 h-10 flex items-center border-b-2 w-full'>
      <i className="ri-search-line text-xl"></i>
      <input type="text" placeholder='search' className='w-full px-3 text-lg font-semibold outline-none'/>
    </div>
  )
}

export default Searchbar