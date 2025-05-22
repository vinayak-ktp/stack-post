import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
  });
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('title', formData.title);
    form.append('content', formData.content);
    form.append('image', formData.image);

    console.log(formData)

    const response = await fetch('http://localhost:3000/create', {
      method: 'POST',
      body: form,
      credentials: 'include',
    });

    if (response.ok) {
      navigate('/profile');
    } else {
      alert('Failed to create post.');
    }
  }

  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center m-0 p-0 bg-linear-to-b from-zinc-300 to-zinc-100">
      <form onSubmit={handleSubmit} className="w-full h-full max-w-none max-h-none p-8 rounded-none shadow-none flex flex-col gap-6 justify-center">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-400"
            placeholder="Enter blog title"
            onChange={handleChange}
            value={formData.title}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            className="w-full flex-1 border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-400 resize-none"
            placeholder="Write your blog content here..."
            style={{ minHeight: "300px" }}
            onChange={handleChange}
            value={formData.content}
          ></textarea>
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            onChange={handleChange}
            // value={formData.image ? formData.image.name : ''}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Create Post
        </button>
      </form>
    </div>
  )
}

export default CreatePost