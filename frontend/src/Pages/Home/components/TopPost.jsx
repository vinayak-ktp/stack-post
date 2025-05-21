import React from 'react';

const TopPost = ({ img }) => {
  return (
    <div className='h-full overflow-hidden p-5'>
      <div className="h-full w-full overflow-hidden rounded-2xl relative shadow-2xl">
        {/* Background Image Layer */}
        <div 
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          className="absolute top-0 left-0 h-full w-full z-0"
        />
        
        {/* Background Color Layer */}
        <div className="absolute top-0 left-0 h-full w-full bg-black opacity-30 z-10" />
        
        {/* Text Layers */}
        <div className='text-zinc-300 text-xl font-semibold absolute top-6 pl-3 pr-10 py-3 bg-linear-to-r from-zinc-800 to-transparent z-20'>
          <p>Top Post</p>
        </div>
        <div className='text-white absolute bottom-0 p-4 pt-20 text-xl font-semibold bg-linear-to-t from-black to-transparent z-20'>
          <p className='mb-2 text-blue-500'>Category</p>
          <p>Nirvana keeps on truckin’ with $80M at a $830M valuation for its AI-powered insurance</p>
        </div>
      </div>
    </div>
  );
};

export default TopPost;
