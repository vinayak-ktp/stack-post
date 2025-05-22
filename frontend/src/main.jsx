import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Pages/Login/Login.jsx'
import Register from './Pages/Register/Register.jsx'
import Profile from './Pages/Profile/Profile.jsx'
import CreatePost from './Pages/CreatePost/CreatePost.jsx'
import BlogPost from './Pages/BlogPost/BlogPost.jsx'
import EditPost from './Pages/EditPost/EditPost.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/create',
    element: <CreatePost />
  },
  {
    path: '/posts/:id',
    element: <BlogPost />
  },
  {
    path: '/edit/:id',
    element: <EditPost />
  },
  {
    path: '/gay',
    loader: () => {
      window.location.href = 'http://localhost:3000/gay';
      return null;
    }
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
