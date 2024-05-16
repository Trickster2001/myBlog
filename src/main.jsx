import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import AddPost from "./pages/AddPost.jsx"
import Post from './pages/Post.jsx'
import AllPosts from './pages/AllPosts.jsx'
import EditPost from './pages/EditPost.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import Home from './pages/Home.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
    {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
                <SignIn />
          </AuthLayout>
        ),
    },
    {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
                <SignUp />
          </AuthLayout>
        ),
    },
    {
      path:"/addpost",
      element: (
        <AuthLayout authentication>
        <AddPost />
        </AuthLayout>
      )
    },
    {
      path: "/post/:slug",
      element: (
        <AuthLayout authentication>
      <Post />
        </AuthLayout>  
    )
  },
  {
    path: "/allPosts",
    element: (
      <AuthLayout authentication>
        <AllPosts />
      </AuthLayout>
  )
  },
  {
    path:"/editPost/:slug",
    element: (
      <AuthLayout authentication>
    <EditPost />
      </AuthLayout>
  )
  }
  ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
