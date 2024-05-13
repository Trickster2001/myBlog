import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Page1 from './pages/Page1.jsx'
import Page2 from './pages/Page2.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
    {
        path: "/page1",
        element: (
                <Page1 />
        ),
    },
    {
        path: "/page2",
        element: (
                <Page2 />
        ),
    }
  ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
